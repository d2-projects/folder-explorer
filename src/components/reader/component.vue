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
      .row-btn {
        height: 14px;
        font-size: 12px;
        margin: 0 2px;
        background-color: #FAFAFA;
        padding: 0 2px;
        border: 1px solid #D9D9D9;
        border-radius: 2px;
        cursor: pointer;
        .anticon {
          svg {
            height: 10px;
            width: 10px;
          }
        }
        &:hover {
          border: 1px solid darken(#2593FC, 30%) !important;
          background-color: #2593FC;
          color: #FFF;
        }
        &.row-btn__hidden {
          opacity: 0;
        }
      }
      &:hover {
        background-color: rgba(#000, .05);
        // 操作按钮变化
        .row-btn {
          border: 1px solid #909399;
        }
      }
    }
  }
}
</style>

<template>
  <div class="reader" flex="dir:top main:justify box:last">
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
          @mouseover="info = item.filePathFull">
          <!-- 隐藏 -->
          <span
            flex="main:center cross:center"
            @click="$store.commit('SCAN_RESULT_UPDATE_ITEM_PROP', {
              path: `${item.dataPath}.isShow`,
              value: false
            })">
            <span
              class="row-btn"
              style="width: 14px;"
              flex="main:center cross:center">
              x
            </span>
          </span>
          <!-- 展开 折叠 -->
          <span
            flex="main:center cross:center"
            @click="$store.commit('SCAN_RESULT_UPDATE_ITEM_PROP', {
              path: `${item.dataPath}.isShowElements`,
              value: !item.isShowElements
            })">
            <span
              class="row-btn"
              :class="{
                'row-btn__hidden': item.isFile
              }"
              style="width: 14px;"
              flex="main:center cross:center">
              <span v-if="item.isShowElements">-</span>
              <span v-else>+</span>
            </span>
          </span>
          <!-- 树枝 -->
          <span class="row-tree">
            <pre>{{item.tree}}</pre>
          </span>
          <!-- 文件信息 -->
          <span class="row-info" flex="cross:center">
            <!-- 文件名 -->
            <pre class="row-info-name">{{item.name}}</pre>
            <!-- 扩展名 -->
            <pre class="row-info-ext" v-if="item.ext">{{item.ext}}</pre>
            <!-- 备注 -->
            <pre v-if="item.note" class="row-info-note"> // {{item.note}}</pre>
            <!-- 操作 -->
            <more :index="index" :value="item"/>
          </span>
        </div>
      </recycle-scroller>
    </div>
    <div class="reader-info">{{ info }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'reader',
  components: {
    more: () => import('./components/more')
  },
  data () {
    return {
      info: ''
    }
  },
  computed: {
    ...mapGetters([
      'SCAN_RESULT_FLAT'
    ])
  }
}
</script>
