<style lang="scss">
.row-more {
  .row-more--button {
    height: 14px;
    width: 22px;
    margin: 0 2px;
    background-color: #FAFAFA;
    border: 1px solid #D9D9D9;
    border-radius: 2px;
    span {
      height: 2px;
      width: 2px;
      border-radius: 1px;
      background-color: #D9D9D9;
      margin-right: 2px;
      &:last-child {
        margin-right: 0px;
      }
    }
    &:hover {
      border: 1px solid darken(#2593FC, 30%) !important;
      background-color: #2593FC;
      span {
        background-color: darken(#2593FC, 30%) !important;
      }
    }
  }
}
</style>

<template>
  <span class="row-more" flex="main:center cross:center" @click="onActive">
    <!-- 按钮 -->
    <span class="row-more--button" flex="main:center cross:center">
      <span></span>
      <span></span>
      <span></span>
    </span>
    <!-- 编辑注释 -->
    <a-modal
      title="编辑注释"
      cancel-text="取消"
      ok-text="确定"
      :closable="false"
      :mask-closable="false"
      v-model="noteEdit.editing"
      @ok="noteEditOnOk">
      <a-input
        v-model="noteEdit.currentNote"
        placeholder="注释内容 回车确认"
        ref="noteEditInput"
        @pressEnter="noteEditOnOk">
        <a-icon slot="prefix" type="tag" />
      </a-input>
    </a-modal>
    <!-- 编辑注释 结束 -->
  </span>
</template>

<script>
import { remote } from 'electron'
import noteEdit from './mixins/noteEdit'
import openFile from './mixins/openFile'
import trash from './mixins/trash'
export default {
  mixins: [
    noteEdit,
    openFile,
    trash
  ],
  props: {
    value: {
      type: Object,
      default: () => ({}),
      required: false
    }
  },
  methods: {
    onActive (e) {
      const menu = new remote.Menu()
      // 注释
      menu.append(new remote.MenuItem({
        label: `${this.value.note === '' ? '添加' : '修改'}注释`,
        click: this.noteEditOnEdit
      }))
      menu.append(new remote.MenuItem({
        label: '删除注释',
        enabled: this.value.note !== '',
        click: () => { this.noteEditOnOk({ note: '' }) }
      }))
      menu.append(new remote.MenuItem({ type: 'separator'}))
      // 打开
      menu.append(new remote.MenuItem({
        label: '打开文件',
        enabled: this.value.data.stat.isFile,
        click: this.openFile
      }))
      menu.append(new remote.MenuItem({
        label: '在 Finder 中显示',
        click: this.openFileInFolder
      }))
      menu.append(new remote.MenuItem({ type: 'separator'}))
      // 删除
      menu.append(new remote.MenuItem({
        label: `将${this.value.data.stat.isFile ? '文件' : '文件夹'}移动到废纸篓`,
        click: this.moveItemToTrash
      }))
      menu.popup(remote.BrowserWindow.getFocusedWindow())
      e.stopPropagation()
    }
  }
}
</script>
