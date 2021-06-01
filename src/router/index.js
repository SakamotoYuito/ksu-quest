import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import Signup from '@/components/auth/Signup'
import Status from '@/components/Status'
import Notification from '@/components/Notification'
import AdventureLog from '@/components/AdventureLog'
import Reader from '@/components/Reader'
import Loading from '@/components/Loading'
import Admin from '@/components/management/Admin'
import CheckIn from '@/components/management/CheckIn'
import CheckOut from '@/components/management/CheckOut'
import MediaStudio from '@/components/facility/MediaStudio'
import Question1 from '@/components/facility/Question1'
import Survey1 from '@/components/facility/Survey1'
import Survey2 from '@/components/facility/Survey2'
import Survey3 from '@/components/facility/Survey3'

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
  {
    path: '/facility/MediaStudio',
    name: 'MediaStudio',
    component: MediaStudio
  },
  {
    path: '/facility/Question1',
    name: 'Question1',
    component: Question1
  },
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

export default router