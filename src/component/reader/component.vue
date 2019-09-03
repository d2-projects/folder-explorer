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
      pre {
        margin-bottom: 0px;
        font-size: 14px;
        line-height: 18px;
      }
      .row-tree {

      }
      .row-info {
        .row-info-name { }
        .row-info-ext { }
        .row-info-icon {
          display: none;
        }
      }
      &:hover {
        background-color: #458DF8;
        color: #FFF;
        border-radius: 2px;
        .row-info {
          .row-info-name {
            background-color: darken(#458DF8, 30%);
            padding: 0 5px;
          }
          .row-info-ext {
            background-color: darken(#458DF8, 10%);
            padding: 0 5px;
          }
          .row-info-icon {
            display: flex;
            width: 21px;
            color: darken(#458DF8, 50%);
            &:hover {
              color: #FFF;
              background-color: darken(#458DF8, 20%);
            }
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="reader" flex="dir:top main:justify box:last">
    <div class="is-pl-5 is-pr-5">
      <recycle-scroller :items="display" :item-size="18" key-field="id" v-slot="{ item }" class="list">
        <div flex="cross:center" class="row" @mouseover="info = item.data.filePathFull">
          <span class="row-tree">
            <pre>{{item.tree.text}}</pre>
          </span>
          <span class="row-info" flex="">
            <pre class="row-info-name">{{item.data.filePathRelativeParsed.name}}</pre>
            <pre class="row-info-ext" v-if="item.data.filePathRelativeParsed.ext">{{item.data.filePathRelativeParsed.ext}}</pre>
            <span class="row-info-icon" flex="main:center cross:center" @click="showItemInFinder(item.data.filePathFull)">
                <a-icon type="folder-open"/>
              </span>
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
import { ipcRenderer } from 'electron'
import translate from '@/util/translate.tree.data.js'
export default {
  name: 'reader',
  props: {
    value: {
      type: Array,
      default: () => [],
      required: false
    }
  },
  data () {
    return {
      info: ''
    }
  },
  computed: {
    display () {
      return translate(this.value)
    }
  },
  methods: {
    showItemInFinder (itemPath) {
      ipcRenderer.send('IPC_SHOW_ITEM_IN_FOLDER', {
        itemPath
      })
    }
  }
}
</script>
