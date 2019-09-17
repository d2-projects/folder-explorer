<template>
  <result-container :border="!HAS_SCAN_DATA">
    <div v-if="HAS_SCAN_DATA" style="width: 100%;height:100%;" ref="charts"></div>
    <empty v-else/>
  </result-container>
</template>

<script>
import { throttle } from 'lodash'
import echarts from 'echarts'
import prettyBytes from 'pretty-bytes'
import { mapGetters } from 'vuex'
export default {
  name: 'statistic-size',
  title: '体积分布',
  data () {
    return {
      charts: null,
      throttledResize: null
    }
  },
  computed: {
    ...mapGetters([
      'SCAN_FOLDER_PATH',
      'HAS_SCAN_DATA',
      'SCAN_RESULT'
    ]),
    option () {
      function maker (elements) {
        return elements.map(element => {
          let size = 0
          function addSize (item) {
            size += item.size
            item.elements.forEach(addSize)
          }
          addSize(element)
          return {
            name: element.name + element.ext,
            value: size,
            ...element.elements.length > 0 ? {
              children: maker(element.elements)
            } : {}
          }
        })
      }
      return {
        backgroundColor: '#777',
        color: [ 
          '#2FC25B', '#9DD96C', '#FACC14', '#E6965C',
          '#1890FF', '#73C9E6', '#13C2C2', '#6CD9B3',
          '#3436C7', '#737EE6', '#223273', '#7EA2E6',
          '#F04864', '#D66BCA', '#8543E0', '#8E77ED'
        ],
        label: {
          formatter: function ({ data }) {
            return [
              data.name,
              prettyBytes(data.value)
            ].join('\n');
          },
          lineHeight: 20
        },
        series: [
          {
            name: this.SCAN_FOLDER_PATH,
            type: 'treemap',
            data: maker(this.SCAN_RESULT),
            top: 40,
            bottom: 10,
            left: 10,
            right: 10,
            breadcrumb: {
              left: 10,
              top: 10,
              height: 20,
              itemStyle: {
                color: '#777',
                borderColor: '#555',
                shadowBlur: 0
              }
            },
            visibleMin: 300,
            upperLabel: {
              height: 30
            },
            itemStyle: {
              normal: {
                borderColor: '#fff'
              }
            },
            levels: [
              {
                itemStyle: {
                  normal: {
                    borderColor: '#777',
                    borderWidth: 0,
                    gapWidth: 2
                  }
                },
                upperLabel: {
                  show: false
                }
              },
              {
                itemStyle: {
                  normal: {
                    borderColor: '#555',
                    borderWidth: 5,
                    gapWidth: 2
                  },
                  emphasis: {
                    borderColor: '#ddd'
                  }
                },
                upperLabel: {
                  show: true
                }
              },
              {
                colorSaturation: [0.35, 0.5],
                itemStyle: {
                  normal: {
                    borderWidth: 5,
                    gapWidth: 2,
                    borderColorSaturation: 0.6
                  }
                },
                upperLabel: {
                  show: true
                }
              }
            ]
          }
        ]
      }
    }
  },
  watch: {
    SCAN_RESULT () {
      this.$nextTick(() => {
        this.setOption()
      })
    }
  },
  mounted () {
    this.init()
    this.throttledResize = throttle(this.resize, 300)
    window.addEventListener('resize', this.throttledResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.throttledResize)
  },
  methods: {
    init () {
      if (this.$refs.charts) {
        this.charts = echarts.init(this.$refs.charts)
        this.setOption()
      }
    },
    resize () {
      if (this.charts) {
        this.charts.resize()
      }
    },
    setOption () {
      if (this.charts) {
        this.charts.setOption(this.option)
      } else {
        this.init()
      }
    }
  }
}
</script>
