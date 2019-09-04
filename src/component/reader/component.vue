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
        }
        .row-info-ext {
          color: #909399;
        }
        .row-info-icon {
          display: none;
          width: 21px;
          color: darken(#458DF8, 50%);
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
            padding: 0 5px;
          }
          .row-info-ext {
            color: #FFF;
            background-color: darken(#458DF8, 10%);
            padding: 0 5px;
          }
          .row-info-icon {
            display: flex;
          }
          .row-info-note-pre {
            display: none;
          }
          .row-info-note {
            color: darken(#458DF8, 50%);
            padding: 0 5px;
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
    <div class="is-pl-5 is-pr-5">
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
          <!-- tree -->
          <span class="row-tree">
            <pre>{{item.tree.text}}</pre>
          </span>
          <!-- 文件信息 -->
          <span class="row-info" flex="">
            <pre class="row-info-name">{{item.data.filePathRelativeParsed.name}}</pre>
            <pre
              class="row-info-ext"
              v-if="item.data.filePathRelativeParsed.ext">{{item.data.filePathRelativeParsed.ext}}</pre>
            <show-item-in-folder :path="item.data.filePathFull"/>
            <add-note
              :value="SCAN_RESULT_FLAT[index].note"
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
import addNote from './component/add-note'
import showItemInFolder from './component/show-item-in-folder'
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
