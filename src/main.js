// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// Importing firebase so we can use it for auth
import firebase from 'firebase';
// Importing data from 'firebaseinit.js' component
import './components/firebaseInit';

Vue.config.productionTip = false

// Creating variable called app
let app;
// This will make user is still logged in when we reload page in app
firebase.auth().onAuthStateChanged(user => {
  if(!app) {
    app = new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    })
  }
});


