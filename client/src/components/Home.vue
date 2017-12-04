<template>
  <div class="content-wrapper">
    <h1></h1>
    <div id="repos-config">
      <ul id="repos">
        <li v-for="repo in repos">
          {{ repo.name }}
        </li>
      </ul>
    </div>   
  </div>
</template>

<script>
import RepoService from "@/services/RepoService";

export default {
  name: "Home",
  data() {
    return {
      repos: null
    };
  },
  async mounted() {
    const apiResp = await RepoService.list()
    if (apiResp.error) {

    } else {
      this.repos = apiResp.data
    }    
  }
};
</script>

<style>

</style>