import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let month = 'july'
let lastTimeMonth = 'june'

export default new Vuex.Store({

  state: {
    load_status: false,
    unsubscribeSnapshot: null,
    userCollection: 'users',
    accesslogCollection: month + '_access_log',
    notificationCollection: 'notification',
    labStatusCollection: 'lab_status',
    statusCollection: month + '_status',
    questDate: month + '_quest',
    month: 'July',
    lastTimeStatusCollection: lastTimeMonth + '_status',
    lastTimeQuestDate: lastTimeMonth + '_quest'
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
