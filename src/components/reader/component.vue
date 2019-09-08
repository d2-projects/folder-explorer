<style lang="scss">
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
    .row {
      color: #606266;
      border-radius: 2px;
      pre {
        margin-bottom: 0px;
        font-size: 14px;
        line-height: 18px;
      }
      .row-info {
        .row-info-name {
          color: #303133;
        }
        .row-info-ext {
          color: #909399;
        }
      }
      &:hover {
        background-color: #D9D9D9;
        // 操作按钮变化
        .row-more--button {
          border: 1px solid #909399;
          span {
            background-color: #909399;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="reader" flex="dir:top main:justify box:last">
    <div class="is-p-5">
      <recycle-scroller :items="SCAN_RESULT_FLAT" :item-size="18" key-field="id" v-slot="{ item, index }" class="list">
        <div flex="cross:center" class="row" @mouseover="info = item.data.filePathFull">
          <!-- 树枝 -->
          <span class="row-tree">
            <pre>{{item.tree.text}}</pre>
          </span>
          <!-- 文件信息 -->
          <span class="row-info" flex="cross:center">
            <!-- 文件名 -->
            <pre class="row-info-name">{{item.data.name}}</pre>
            <!-- 扩展名 -->
            <pre class="row-info-ext" v-if="item.data.ext">{{item.data.ext}}</pre>
            <!-- 备注 -->
            <pre v-if="item.note" class="row-info-note"> // {{item.note}}</pre>
            <!-- 操作 -->
            <more :value="item" @note-change="note => onNoteChange({ item, index, note })"/>
          </span>
        </div>
      </recycle-scroller>
    </div>
    <div class="reader-info">{{ info }}</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import more from './components/more'
export default {
  name: 'reader',
  components: {
    more
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
      'NOTES_UPDATE',
      'SCAN_RESULT_FLAT_UPDATE_ITEM'
    ]),
    /**
     * 变更备注
     */
    onNoteChange ({ item, index, note }) {
      // 更新 SCAN_RESULT_FLAT 中的数据
      this.SCAN_RESULT_FLAT_UPDATE_ITEM({
        index,
        item: {
          ...this.SCAN_RESULT_FLAT[index],
          note
        }
      })
      // 更新 NOTES 中的数据
      this.NOTES_UPDATE({
        path: item.data.filePathFull,
        value: note
      })
    }
  }
}
</script>
