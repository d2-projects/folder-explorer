<template>
  <div class="setting-component">
    <a-button icon="export" class="is-mr-10" @click="STORE_EXPORT">
      全部
    </a-button>
    <a-button-group>
      <a-button icon="export" @click="STORE_EXPORT({ setting: false })">
        只包含数据
      </a-button>
      <a-button icon="export" @click="STORE_EXPORT({ data: false })">
        只包含设置
      </a-button>
    </a-button-group>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'setting-export',
  methods: {
    ...mapMutations([
      'STORE_EXPORT'
    ])
  }
}
</script>
