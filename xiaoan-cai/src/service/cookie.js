// import cookies from 'js-cookie'

const cookies = () => import('js-cookie')

export default {
  get(name) {
    let value = cookies.get(name)
    if (!value) {
      value = ''
    }
    return value
  },
  set(name, value) {
    // cookies.set(name, value)
    cookies.set(name, value, { expires: 365 })
    // cookies.set(name, value, { expires: 365, domain: 'xiaoan.com.cn' })
  },
  remove() {
    cookies.remove('name')
  },
  islogin () {
    let userId = this.get('userId')
    if (userId) {
      return true
    } else {
      return false
    }
  }
}
