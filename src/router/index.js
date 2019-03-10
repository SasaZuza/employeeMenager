import Vue from 'vue'
import Router from 'vue-router'
// Importing components previosly created
import Dashboard from '@/components/Dashboard'
import NewEmployee from '@/components/NewEmployee'
import ViewEmployee from '@/components/ViewEmployee'
import EditEmployee from '@/components/EditEmployee'
import Login from '@/components/Login'
import Register from '@/components/Register'
// Importing firebase
import firebase from 'firebase'

Vue.use(Router)

// For creating guards we need to add 'Router' to variable and export it at the end
let router = new Router({

  // Adding routes for our App components
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      // We add this meta when we vant that route has auth for using it
      meta: {
        requiresAuth: true
      }
    },

    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },

    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    },

    {
      path: '/new',
      name: 'new-employee',
      component: NewEmployee,
      // We add this meta when we vant that route has auth for using it
      meta: {
        requiresAuth: true
      }
    },

    {
      path: '/edit/:employee_id',
      name: 'edit-employee',
      component: EditEmployee,
      // We add this meta when we vant that route has auth for using it
      meta: {
        requiresAuth: true
      }
    },

    {
      path: '/:employee_id',
      name: 'view-employee',
      component: ViewEmployee,
      // We add this meta when we vant that route has auth for using it
      meta: {
        requiresAuth: true
      }
    }
  ]
})

// For using those meta above we need to create guards

router.beforeEach((to, from, next) => {

  // Checking for 'requiresAuth' guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if user is not logged 
    if (!firebase.auth().currentUser) {
      // If not logged in go to login page
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });

    // If we are logged in procced to route
    } else {
      // Proceed to route is done with this 'next' parameter
      next();
    }

  // Checking for 'requiresGest' guard  
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if user is logged 
    if (firebase.auth().currentUser) {
      // Go to homepage if logged in
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });

    // If not proceed to route  
    } else {
      // Proceed to route with this 'next' parameter
      next();
    }
  
  // If there is no guard found then proceed to route
  }  else {
    // Proceed to route with this 'next' parameter
    next();
  }
});

// Exporting router here
export default router;
