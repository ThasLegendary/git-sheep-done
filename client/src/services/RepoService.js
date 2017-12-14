import Api from '@/services/Api'

export default {
  list () {
    return Api().get('repos')
  },
  enable (repoId, enable) {
    return Api().get('repo/enable/' + repoId + '/' + enable)
  }
}
