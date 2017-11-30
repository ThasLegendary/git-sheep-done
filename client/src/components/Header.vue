<template>
  <div id="header" v-if="$auth.isAuthenticated">
    <img :src="$store.state.user.avatar" />    
  </div>
</template>

<script>  
  export default {
    name: 'header'
  }
</script>