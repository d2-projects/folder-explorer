<style lang="scss" scoped>
.empty {
  font-size: 200px;
  color: #D9D9D9;
  cursor: pointer;
  &:hover {
    font-size: 200px;
    color: #2593FC;
  }
}
</style>

<template>
  <div
    class="empty full"
    flex="main:center cross:center"
    @click="IPC_FOLDER_SELECT">
    <a-icon type="folder-open" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'empty',
  methods: {
    ...mapMutations([
      'IPC_FOLDER_SELECT'
    ])
  }
}
</script>
