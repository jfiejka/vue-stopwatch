<template>
  <div id="app">
    <Stopwatch/>
  </div>
</template>

<script>
import Stopwatch from './components/Stopwatch.vue'

export default {
  name: 'app',
  components: {
    Stopwatch
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
