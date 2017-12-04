<template>
  <div id="app">
    <app-header/>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'app',
  components: {
    'app-header': Header
  }
}
</script>

<style src="./assets/css/reset.css"></style>
<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i');
  #app {
    font-family: 'Open Sans';
  }
</style>
<!--style lan="scss" src="./scss/main.scss"
</style-->
