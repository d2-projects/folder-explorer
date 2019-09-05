<template>
  <container>
    <ve-pie
      v-if="HAS_SCAN_DATA"
      height="100%"
      :data="chartData"
      :settings="chartSettings"
      :extend="chartExtend">
    </ve-pie>
    <empty v-else/>
  </container>
</template>

<script>
import VePie from 'v-charts/lib/pie.common'
import { mapGetters } from 'vuex'
export default {
  name: 'statistic',
  title: '统计',
  icon: 'pie-chart',
  components: {
    VePie
  },
  data () {
    return {
      chartSettings: {
        hoverAnimation: false,
        label: {
          formatter: '{b}: {c}'
        }
      },
      chartExtend: {
        color: [
          '#1890FF', '#73C9E6', '#13C2C2', '#6CD9B3', 
          '#2FC25B', '#9DD96C', '#FACC14', '#E6965C',
          '#F04864', '#D66BCA', '#8543E0', '#8E77ED',
          '#3436C7', '#737EE6', '#223273', '#7EA2E6'
        ],
        legend: {
          bottom: 0,
          padding: [ 0, 20, 20, 20 ],
          itemWidth: 8,
          itemHeight: 8
        },
        series: {
          center: [ '50%', '45%' ],
          minAngle: 1
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'HAS_SCAN_DATA',
      'SCAN_RESULT_STATISTIC_EXT'
    ]),
    chartData () {
      return {
        columns: ['name', 'value'],
        rows: this.SCAN_RESULT_STATISTIC_EXT
      }
    }
  }
}
</script>
