<template>
  <div style="margin: 0 8px">
    <SvgIcon
      @click="onFullScreen"
      iconClass="fullscreen"
      className="fullscreen"
    ></SvgIcon>
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'FullScreen',
  data() {
    return {}
  },

  created() {},

  methods: {
    onFullScreen() {
      if (screenfull.isEnabled) {
        screenfull.toggle()
      }
    },
  },
}
</script>

<style scoped lang="scss">
.fullscreen {
  color: #fff;
}
</style>
