<style lang="scss" scoped>
.reader {
  height: 100%;
  .reader-info {
    line-height: 14px;
    font-size: 10px;
    background-color: #D9D9D9;
    color: #333;
    padding-left: 5px;
    padding-right: 5px;
  }
  .list {
    height: 100%;
    cursor: pointer;
    user-select: none;
    .row {
      color: #606266;
      pre {
        margin-bottom: 0px;
        font-size: 14px;
        line-height: 18px;
      }
      .row-tree {}
      .row-info {
        .row-info-name {
          color: #303133;
          padding: 0 3px;
        }
        .row-info-ext {
          color: #909399;
          margin-left: -3px;
          padding-right: 3px;
        }
        .row-info-button {
          display: none;
          font-size: 12px;
          color: lighten(#458DF8, 30%);
          padding: 0 5px;
          &:hover {
            color: #FFF;
            background-color: darken(#458DF8, 20%);
          }
        }
        .row-info-note-pre {}
        .row-info-note {
          color: #1890FF;
        }
      }
      &:hover {
        background-color: #458DF8;
        color: #FFF;
        border-radius: 2px;
        .row-info {
          .row-info-name {
            color: #FFF;
            background-color: darken(#458DF8, 30%);
          }
          .row-info-ext {
            color: #FFF;
            background-color: darken(#458DF8, 30%);
          }
          .row-info-button {
            display: flex;
          }
          .row-info-note-pre {
            display: none;
          }
          .row-info-note {
            display: none;
          }
        }
      }
    }
  }
}
</style>

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
