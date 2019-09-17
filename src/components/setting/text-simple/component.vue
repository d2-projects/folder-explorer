<template>
  <div class="setting-component" flex>
    <a-input
      v-model="editValve"
      v-bind="$attrs"
      class="is-mr-5"/>
    <a-button
      v-if="editValve !== currentValue"
      type="danger"
      icon="close"
      class="is-mr-5"
      @click="onCancel">
    </a-button>
    <a-button
      v-if="editValve !== currentValue"
      type="primary"
      icon="check"
      @click="onOk">
    </a-button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { get } from 'lodash'
export default {
  name: 'setting-text-simple',
  props: {
    path: {
      type: String,
      default: '',
      required: true
    }
  },
  data () {
    return {
      editValve: ''
    }
  },
  computed: {
    ...mapState([
      'SETTING'
    ]),
    currentValue () {
      return get(this.SETTING, this.path, false)
    }
  },
  watch: {
    currentValue: {
      handler (value) {
        this.editValve = value
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations([
      'SETTING_UPDATE'
    ]),
    onCancel () {
      this.editValve = this.currentValue
    },
    onOk () {
      this.SETTING_UPDATE({
        path: this.path,
        value: this.editValve
      })
    }
  }
}
</script>
