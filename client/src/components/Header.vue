<template>
  <nav v-if="$store.state.isUserLoggedIn">
    <div>
      <a href="#0">
        <img src="https://img15.hostingpics.net/pics/141704noun227671cc.png" />
      </a></div>
    <div><a href="#0">Tour</a></div>
    <div><a href="#0">Support</a></div>
    <div class="account">
      <a href="#0" v-on:click.prevent="showUserMenu = !showUserMenu">
        <img :src="$store.state.user.avatar" alt="avatar">
        Account
      </a>
      <ul v-if="showUserMenu">
        <li><a href="#0">My Account</a></li>
        <li><a href="#0">Edit Account</a></li>
        <li><a href="#0" v-on:click.prevent="logout">Logout</a></li>
      </ul>
    </div>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "header",
  data: function() {
    return {
      showUserMenu: false
    };
  },
  methods: {
    logout: function() {
      this.$store.dispatch("clear");
      this.showUserMenu = false;
      this.$router.push({ name: "Login" });
    }
  }
};
</script>

<style lang="scss">
body {
  font-family: 'Open Sans';
}

nav {
  background: #3e454c;
  display: flex;
  align-items: center;
  height: 50px;

  div:first-child {
    margin-right: auto;
  }

  div {
    margin: auto 0 auto 1em;

    a {
      display: block;
      position: relative;      
      text-decoration: none;
      color: #fff;      

      img {
        width: 2em;
        height: 2em;
      }
    }
  }

  div.account {
    position: relative;
    background: #2c3136;
    display: flex;
    height: 100%;

    a {
      margin: auto 1em auto 1em; 
      img {
        border-radius: 50%;
        width: 1.5em;
        height: 1.5em;
        vertical-align: middle;
      }
    }

    ul {      
      position: absolute;
      background: #2c3136;
      top: 50px;
      width: 100%;

      li {
        margin: 0.5em 0 0.5em 0;
        white-space: nowrap;
      }
    }
  }
}
</style>