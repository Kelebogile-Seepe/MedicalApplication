import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// Import components instead of views
import LoginPage from '../components/LoginPage.vue'
import DoctorPage from '../components/DoctorPage.vue'
import PharmacistPage from '../components/PharmacistPage.vue'
import ReceptionistPage from '../components/ReceptionistPage.vue'
import RegisterPage from '../components/RegisterPage.vue'
import patientoverviewPage from '@/components/patientoverviewPage.vue'
import sidenavPage from '@/components/sidenavPage.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login' 
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/doctor',
    name: 'Doctor',
    component: DoctorPage
  },
  {
    path: '/pharmacist',
    name: 'Pharmacist',
    component: PharmacistPage
  },
  {
    path: '/receptionist',
    name: 'Receptionist',
    component: ReceptionistPage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  },
  {
    path: '/patientoverview',
    name: 'Patientoverview',
    component: patientoverviewPage
  },
    {
    path: '/sidenav',
    name: 'sidenavPage',
    component: sidenavPage
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
