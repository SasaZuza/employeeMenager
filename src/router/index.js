import Vue from 'vue'
import Router from 'vue-router'
// Importing components previosly created
import Dashboard from '@/components/Dashboard'
import NewEmployee from '@/components/NewEmployee'
import ViewEmployee from '@/components/ViewEmployee'
import EditEmployee from '@/components/EditEmployee'

Vue.use(Router)

export default new Router({
  // Adding routes for our App components
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },

    {
      path: '/new',
      name: 'new-employee',
      component: NewEmployee
    },

    {
      path: '/edit/:employee_id',
      name: 'edit-employee',
      component: EditEmployee
    },

    {
      path: '/:employee_id',
      name: 'view-employee',
      component: ViewEmployee
    }

  ]
})
