import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import Signup from '@/components/auth/Signup'
import Status from '@/components/Status'
import PostQuest from '@/components/PostQuest'
import Notification from '@/components/Notification'
import AdventureLog from '@/components/AdventureLog'
import Reader from '@/components/Reader'
import Loading from '@/components/Loading'
import Admin from '@/components/management/Admin'
import CheckIn from '@/components/management/CheckIn'
import CheckOut from '@/components/management/CheckOut'
// import MediaStudio from '@/components/facility/MediaStudio'
import JulyNetwork from '@/components/facility/July/JulyNetwork'
import JulySecurity from '@/components/facility/July/JulySecurity'
import JulyDataScience from '@/components/facility/July/JulyDataScience'
import JulyRobot from '@/components/facility/July/JulyRobot'
import JulyInfrastructure from '@/components/facility/July/JulyInfrastructure'
import JulyIoT from '@/components/facility/July/JulyIoT'
import JulyFabrication from '@/components/facility/July/JulyFabrication'
import JulyBrain from '@/components/facility/July/JulyBrain'
import JulyMedia from '@/components/facility/July/JulyMedia'
import JulySE from '@/components/facility/July/JulySE'
// import Question1 from '@/components/facility/Question1'
import Survey1 from '@/components/facility/Survey1'
import Survey2 from '@/components/facility/Survey2'
import Survey3 from '@/components/facility/Survey3'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/PostQuest',
    name: 'PostQuest',
    component: PostQuest
  },
  {
    path: '/Status',
    name: 'Status',
    component: Status
  },
  {
    path: '/Notification',
    name: 'Notification',
    component: Notification
  },
  {
    path: '/AdventureLog',
    name: 'AdventureLog',
    component: AdventureLog
  },
  {
    path: '/Reader',
    name: 'Reader',
    component: Reader
  },
  {
    path: '/Loading',
    name: 'Loading',
    props: true,
    component: Loading
  },
  {
    path: '/management/Admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/management/CheckIn',
    name: 'CheckIn',
    component: CheckIn
  },
  {
    path: '/management/CheckOut',
    name: 'CheckOut',
    component: CheckOut
  },
  // {
  //   path: '/facility/MediaStudio',
  //   name: 'MediaStudio',
  //   component: MediaStudio
  // },
  {
    path: '/facility/July/JulyNetwork',
    name: 'JulyNetwork',
    component: JulyNetwork
  },
  {
    path: '/facility/July/JulySecurity',
    name: 'JulySecurity',
    component: JulySecurity
  },
  {
    path: '/facility/July/JulyDataScience',
    name: 'JulyDataScience',
    component: JulyDataScience
  },
  {
    path: '/facility/July/JulyRobot',
    name: 'JulyRobot',
    component: JulyRobot
  },
  {
    path: '/facility/July/JulyInfrastructure',
    name: 'JulyInfrastructure',
    component: JulyInfrastructure
  },
  {
    path: '/facility/July/JulyIoT',
    name: 'JulyIoT',
    component: JulyIoT
  },
  {
    path: '/facility/July/JulyFabrication',
    name: 'JulyFabrication',
    component: JulyFabrication
  },
  {
    path: '/facility/July/JulyBrain',
    name: 'JulyBrain',
    component: JulyBrain
  },
  {
    path: '/facility/July/JulyMedia',
    name: 'JulyMedia',
    component: JulyMedia
  },
  {
    path: '/facility/July/JulySE',
    name: 'JulySE',
    component: JulySE
  },
  // {
  //   path: '/facility/Question1',
  //   name: 'Question1',
  //   component: Question1
  // },
  {
    path: '/facility/Survey1',
    name: 'Survey1',
    component: Survey1
  },
  {
    path: '/facility/Survey2',
    name: 'Survey2',
    component: Survey2
  },
  {
    path: '/facility/Survey3',
    name: 'Survey3',
    component: Survey3
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  store.commit('SET_LOAD_STATUS', true)

  next()
})

router.afterEach(() => {
  setTimeout(() => {
    store.commit('SET_LOAD_STATUS')
  }, 1000)
})

export default router
