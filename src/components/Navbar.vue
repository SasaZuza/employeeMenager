<template>
    <nav>
        <div class="nav-wrapper orange">

            <!-- Adding logo to navbar -->
            <div class="conatainer left">
                <router-link to="/" class="brand-logo">
                <i class="fas fa-archive logo-icon white-text"><span> Workers store</span></i>
                </router-link>
            </div>

            <!-- Adding links to dashboard register and login -->
            <!-- Showing some options of navbar depending if user is logged in or not with 'v-if' option -->
            
            <ul class="right">

                <li v-if="isLoggedIn">
                    <i class="fas fa-user-circle"></i>
                    <span class="email white-text">{{currentUser}}</span>
                </li>

                <li v-if="isLoggedIn">
                    <router-link to='/'> 
                        <i class="fas fa-draw-polygon"><span> Dashboard</span></i>
                    </router-link>
                </li>

                <li v-if="!isLoggedIn">
                    <router-link to='/login'>
                    <i class="far fa-user"><span> Login</span></i>
                    </router-link>
                </li>

                <li v-if="!isLoggedIn">
                    <router-link to='/register'>
                    <i class="fas fa-sign-in-alt"><span> Sign In</span></i>
                    </router-link>
                </li>

                <!-- Here we create click event that activates 'logout()' method created bellow -->                
                <li class="btn-logout" v-if="isLoggedIn"><button v-on:click="logout" class="btn red"><span class="button-text">Logout</span></button></li>
            </ul>

        </div>
    </nav>
</template>


<script>

// Importing firebase so we can use it for auth
import firebase from 'firebase';

export default {

    name: 'navbar',

    data() {
        return {
            // Seting some properties as boolean values
            isLoggedIn: false,
            currentUser: false
        }
    },

    // This is life-cycle hook that activates when user component is created
    // It will show or hide som navbar buttons depending if user logged in or not
    created() {
        if (firebase.auth().currentUser) {
            this.isLoggedIn = true;
            this.currentUser = firebase.auth().currentUser.email;
        }
    },

    methods: {
        // Method for logging out from app
        logout: function() {
            firebase.auth().signOut().then(() => {
                // Using router to go to the homepage and reload navbar (show/hide some buttons)
                this.$router.go({ path: this.$router.path });
        });
        }
    }
    
}

</script>


<style scoped>   
    
    /* Adding some padding to the email option */
    .email, .btn-logout {
        padding-right: 20px;
    }

    .logo-icon {
        padding-left: 10px;        
    }

    span{
        font-family: 'Hind', sans-serif;
        font-size: 20px;
        font-style: bold;
    }

    .button-text{
        font-size: 14px;
    }

</style>
