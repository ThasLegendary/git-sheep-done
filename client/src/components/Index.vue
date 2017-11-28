<template>
  <div class="authentication">
    <h1>{{ msg }}</h1>
    <button @click="authenticate('github')">auth Github</button>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    authenticate: function (provider) {
      this.$auth.authenticate(provider).then(function () {
        // Execute application logic after successful social authentication
      })
    }
  }
}
</script>

</style>
