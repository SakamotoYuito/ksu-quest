import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    load_status: false,
    unsubscribeSnapshot: null,
    userCollection: 'users',
    accesslogCollection: 'july_access_log',
    notificationCollection: 'notification',
		statusCollection: 'july_status',
		questDate: 'july_quest'
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
