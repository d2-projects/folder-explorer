<template>
  <div
    class="reader"
    flex="dir:top main:justify box:last">
    <div class="is-p-5">
      <recycle-scroller
        :items="SCAN_RESULT_FLAT"
        :item-size="18"
        key-field="id"
        v-slot="{ item, index }"
        class="list">
        <div
          flex="cross:center"
          class="row"
          @mouseover="info = item.data.filePathFull">
          <!-- 树枝 -->
          <span class="row-tree">
            <pre>{{item.tree.text}}</pre>
          </span>
          <!-- 文件信息 -->
          <span class="row-info" flex="">
            <!-- 文件名 -->
            <pre class="row-info-name">{{item.data.filePathParsed.name}}</pre>
            <!-- 扩展名 -->
            <pre
              class="row-info-ext"
              v-if="item.data.filePathParsed.ext">{{item.data.filePathParsed.ext}}</pre>
            <!-- 打开目录 -->
            <show-item-in-folder :path="item.data.filePathFull"/>
            <!-- 编辑注释 -->
            <add-note
              :value="item.note"
              @input="note => onNoteChange({ index, note })"
              :file-name="item.data.filePathFullParsed.base"/>
            <pre class="row-info-note-pre" v-if="item.note"> // </pre>
            <pre class="row-info-note" v-if="item.note">{{item.note}}</pre>
          </span>
        </div>
      </recycle-scroller>
    </div>
    <div class="reader-info">
      {{ info }}
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import addNote from './components/add-note'
import showItemInFolder from './components/show-item-in-folder'
export default {
  name: 'reader',
  components: {
    addNote,
    showItemInFolder
  },
  data () {
    return {
      info: ''
    }
  },
  computed: {
    ...mapState([
      'SCAN_RESULT_FLAT'
    ])
  },
  methods: {
    ...mapMutations([
      'SCAN_RESULT_FLAT_UPDATE_ITEM'
    ]),
    /**
     * 变更注释
     */
    onNoteChange ({ index, note }) {
      this.SCAN_RESULT_FLAT_UPDATE_ITEM({
        index,
        item: {
          ...this.SCAN_RESULT_FLAT[index],
          note
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style';
</style>
