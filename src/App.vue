<template>
  <div id="app">
    <LeftBar></LeftBar>
    <!-- <router-view /> -->
  </div>
</template>
<script>
import LeftBar from './home/com/left-bar.vue'
export default {
  name: 'App',
  components: {
    LeftBar
  }
}
</script>