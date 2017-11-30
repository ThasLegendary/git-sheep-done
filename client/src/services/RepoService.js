import Api from '@/services/Api'

export default {
  list () {
    return Api().get('repos')
  }
}
