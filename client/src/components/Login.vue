<template>
  <div class="authentication">
    <h1>{{ msg }}</h1>
    <button @click="authenticate('github')">auth Github</button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    authenticate: function (provider) {
      this.$auth.authenticate(provider).then((authResponse) => {        
        // Execute application logic after successful social authentication
        if (this.$auth.isAuthenticated()) {
          console.log(authResponse.data)

          this.$store.dispatch('setToken', authResponse.data.token)          
          this.$store.dispatch('setUser', {
            name: authResponse.data.name, 
            avatar: authResponse.data.avatar
          })

          this.$router.push({ name: 'Home'})
        } else {
          this.$router.push({ name: 'Index'})
        }
      })
    }
  }
}
</script>

<style>
</style>