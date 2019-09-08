<template>
  <div class="setting-component">
    <p>
      <a-checkbox-group :options="options" v-model="value"/>
    </p>
    <a-button
      icon="export"
      class="is-mr-10"
      :disabled="value.length === 0"
      @click="STORE_EXPORT({ include: value })">
      导出
    </a-button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'setting-export',
  data () {
    return {
      value: [
        'DB',
        'SETTING'
      ],
      options: [
        { label: '缓存', value: 'CACHE' },
        { label: '数据库', value: 'DB' },
        { label: '设置', value: 'SETTING' }
      ]
    }
  },
  methods: {
    ...mapMutations([
      'STORE_EXPORT'
    ])
  }
}
</script>
