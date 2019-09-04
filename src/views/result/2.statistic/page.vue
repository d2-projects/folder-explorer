<template>
  <container>
    {{SCAN_RESULT_STATISTIC_EXT}}
  </container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'statistic',
  title: '统计',
  computed: {
    ...mapGetters([
      'SCAN_RESULT_STATISTIC_EXT'
    ])
  }
}
</script>
