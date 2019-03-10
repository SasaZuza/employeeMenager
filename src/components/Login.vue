<template>
  <div>

    <div class="container">
    <div class="row">
      <div class="col s12 m8 offset-m2">
        <div class="login card-panel orange white-text center">
          
          <h3>Login to App</h3>

          <form action="index.html">

            <div class="input-field">
              <i class="material-icons prefix red-text">email</i>
              <input type="email" id="email" class="validate" v-model="email">
              <label class="white-text" for="email">Enter email address...</label>
            </div>

            <div class="input-field">
              <i class="material-icons prefix red-text">lock</i>
              <input type="password" id="password" class="validate" v-model="password">
              <label class="white-text" for="password">Enter password...</label>
            </div>

            <!-- On this button we add onClick event that activate 'login()' method defined bellow-->
            <button v-on:click="login" class="btn btn-large btn-extended red white-text">Login</button>

          </form>
        </div>
      </div>
    </div>
  </div>

  </div>
</template>

<script>

// Importing firebase so we can use it for auth
import firebase from 'firebase';

export default {
    
    name: 'login',

    data: function() {
    return {
      // Seting this properties as default values to nothing
      email: '',
      password: ''
    };
  },

  methods: {
    // Defining 'login' method to make login of user to firebase
    login: function(e) {
      firebase.auth()
      // loging in with user
        .signInWithEmailAndPassword(this.email, this.password)
        .then( user => {
            // Promise with adding alert box that user is logged in
            alert(`You are logged in as ${user.user.email}`);
            // Using router to go to the homepage and reload navbar (show/hide some buttons)
            this.$router.go({ path: this.$router.path });
          },
          // Alert box that prints error message
          err => {
            alert(err.message);
          }
        );
      e.preventDefault();
    }
  }
};
</script>
