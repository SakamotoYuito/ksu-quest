import Vue from 'vue'
import App from '@/App.vue'
import '@/plugins/firebase'
import router from '@/router'
import VueQrcodeReader from "vue-qrcode-reader"
import firebase from 'firebase'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(VueQrcodeReader)

let baseApp

firebase.auth().onAuthStateChanged(() => {
  if(!baseApp) {
    baseApp = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})

Vue.config.errorHandler = function (error) {
  if (error.name === 'NavigationDuplicated') {
    // routerで遷移する時、同じページに遷移しようとすると起こるエラーを回避
    return
  }
}
