<template>
  <container>
    <ve-pie :data="chartData"></ve-pie>
  </container>
</template>

<script>
import VePie from 'v-charts/lib/pie.common'
import { mapGetters } from 'vuex'
export default {
  name: 'statistic',
  title: '统计',
  components: {
    VePie
  },
  computed: {
    ...mapGetters([
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
