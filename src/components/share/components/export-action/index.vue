<style lang="scss" scoped>
.export-action {
  padding: 10px 15px;
  border-radius: 4px;
  margin-bottom: 20px;
  user-select: none;
  cursor: pointer;
  border: 1px solid;
  &.export-action--green {
    background-image: linear-gradient(180deg, #A5EC00 0%, #6CD400 100%);
    border-color: #58A902;
    &:hover { background-image: linear-gradient(180deg, lighten(#A5EC00, 2%) 0%, lighten(#6CD400, 2%) 100%); }
    .export-action--title { color: darken(#58A902, 20%) }
    .export-action--desc { color: darken(#58A902, 15%) }
  }
  &.export-action--blue {
    background-image: linear-gradient(180deg, #61E4FF 0%, #32C5FF 100%);
    border-color: #289DCC;
    &:hover { background-image: linear-gradient(180deg, lighten(#61E4FF, 8%) 0%, lighten(#32C5FF, 8%) 100%); }
    .export-action--title { color: darken(#289DCC, 20%) }
    .export-action--desc { color: darken(#289DCC, 15%) }
  }
  &.export-action--red {
    background-image: linear-gradient(180deg, #E88D37 0%, #EB2301 100%);
    border-color: #C81C00;
    &:hover { background-image: linear-gradient(180deg, lighten(#E88D37, 8%) 0%, lighten(#EB2301, 8%) 100%); }
    .export-action--title { color: lighten(#C81C00, 55%) }
    .export-action--desc { color: lighten(#C81C00, 45%) }
  }
  &.export-action--violet {
    background-image: linear-gradient(180deg, #BE37E8 0%, #9701EB 100%);
    border-color: #7A00BD;
    &:hover { background-image: linear-gradient(180deg, lighten(#BE37E8, 8%) 0%, lighten(#9701EB, 8%) 100%); }
    .export-action--title { color: lighten(#7A00BD, 55%) }
    .export-action--desc { color: lighten(#7A00BD, 45%) }
  }
  img {
    width: 26px;
    height: 26px;
    margin-right: 10px;
  }
  .export-action--title {
    font-size: 14px;
    font-weight: bold;
  }
  .export-action--desc {
    font-size: 12px;
  }
}
</style>

<template>
  <div
    class="export-action"
    :class="`export-action--${color}`"
    flex="cross:center"
    @click="e => $emit('click', e)">
    <img :src="image" draggable="false">
    <div>
      <div class="export-action--title">
        {{ title }}
      </div>
      <div class="export-action--desc">
        {{ desc }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: '',
      required: false
    },
    color: {
      type: String,
      default: '',
      required: false
    },
    title: {
      type: String,
      default: '',
      required: false
    },
    desc: {
      type: String,
      default: '',
      required: false
    }
  },
  computed: {
    image () {
      return require(`@/assets/icon/export/${this.icon}.png`)
    }
  }
}
</script>
