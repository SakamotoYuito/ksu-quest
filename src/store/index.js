import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let month = 'june'

export default new Vuex.Store({

  state: {
    load_status: false,
    unsubscribeSnapshot: null,
    userCollection: 'users',
    accesslogCollection: month + '_access_log',
    notificationCollection: 'notification',
		statusCollection: month + '_status',
		questDate: month + '_quest'
  },
  mutations: {
    SET_LOAD_STATUS(state, loadStatus) {
      state.load_status = loadStatus
    },
    SET_UNSUBSCRIBE(state, unsubscribe) {
      state.unsubscribeSnapshot = unsubscribe
    }
  }
})
