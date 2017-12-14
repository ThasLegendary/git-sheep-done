<template>
  <div class="content-wrapper">
    <h1>Active repositories: {{totalActiveRepo}}</h1>
    <div class="repo-list">
      <div class="repo" v-for="repo in repos" v-bind:key="repo.id">
        <div class="title">
          {{repo.name}} {{repo.owner}}<br>
          <span>{{repo.description}}</span>
        </div>
        <repo-toggle v-model="repo.enabled" :id="repo.id" @input="saveRepoStatus(repo.id, ...arguments)" />
      </div>
    </div>   
  </div>
</template>

<script>
import RepoService from "@/services/RepoService";
import Toggle from '@/components/ui/Toggle.vue';

export default {
  name: "Home",
  components: {
    'repo-toggle': Toggle
  },
  data() {
    return {
      repos: null,
      totalActiveRepo: 0
    };
  },
  async mounted() {
    const apiResp = await RepoService.list()
    console.log(apiResp)
    if (apiResp.error) {

    } else {
      this.repos = apiResp.data
      this.repos.forEach((repo) => {
        if (repo.enabled) {
          this.totalActiveRepo++
        }
      })
    }    
  },
  methods: {
    saveRepoStatus: function(repoId, enabled) {
      if (enabled) {
        this.totalActiveRepo++
      } else {
        this.totalActiveRepo--
      }
      RepoService.enable(repoId, enabled)
    }
  }
};
</script>

<style lang="scss">

.content-wrapper {
  margin: 2em;
}

.repo-list {
  display: flex;
  flex-direction: column;

  .repo {
    display: flex;
    padding: 1em 0 1em 0;
    border-bottom: 1px solid grey;

    .title {
      span {
        color: rgba(0, 0, 0, 0.54);
      }
      flex-grow: 3;
    }

    repo-toggle {
      margin-left: auto;
      flex-grow: 1;
    }
  }
}
</style>