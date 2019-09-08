<template>
  <div class="setting-component">
    <p>
      <a-checkbox-group :options="options" v-model="value"/>
    </p>
    <a-button
      type="danger"
      icon="reload"
      :disabled="value.length === 0"
      @click="onClick">
      重置软件
    </a-button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'setting-retore',
  data () {
    return {
      value: [
        'CACHE',
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
      'RESTORE'
    ]),
    onClick () {
      this.$confirm({
        title: '确定要还原所有数据吗？',
        content: '此操作将会抹除所有的设置数据和已经扫描的数据',
        cancelText: '取消',
        okText: '抹除',
        okType: 'danger',
        onOk: () => {
          this.RESTORE({
            include: this.value
          })
          this.$message.success('软件已经恢复到初始状态')
        },
        onCancel: () => {
          this.$message.info('放心，什么都没有发生')
        }
      })
    }
  }
}
</script>
