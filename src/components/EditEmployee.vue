<template>
    <div id="edit-employee">

        <h3>Edit Employee</h3>
        
        <div class="row">
            <!-- Creating form and event that will trigger function to save employee data -->
            <form @submit.prevent="updateEmployee" class="col s12">

                <!-- Creating row as a input field and bind dat to database  -->
                <!-- Row for ID -->
                <div class="row">
                    <div class="input-field col s12">
                        <input disabled type="text" v-model="employee_id" required>
                    </div>
                    <label>Employee ID#</label>
                </div>

                <!-- Row for Name -->
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="name" required>
                    </div>
                    <label>Name#</label>
                </div>

                <!-- Row for Department -->
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="dept" required>
                    </div>
                    <label>Department#</label>
                </div>

                <!-- Row for Position -->
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="position" required>
                    </div>
                    <label>Position#</label>
                </div>

                <!-- Adding button for submit -->
                <button type="submit" class="btn">Submit</button>

                <!-- Cansel button to go back to homepage as router link is created also -->
                <router-link to="/" class="btn grey">Cancel</router-link>

            </form>
        </div>
    </div>
</template>

<script>

// Here we import database from this file
import db from './firebaseInit'

export default {
    
    name: 'edit-employee',

    data () {
      return {
        employee_id: null,
        name: null,
        dept: null,
        position: null
      }
    },

    // Adding life-cycle hook athat run in specific period of time   
    beforeRouteEnter (to, from, next) {
      // Here we connect to database collection and access individual employee by it's id parameter
      db.collection('employees').where('employee_id', '==', to.params.employee_id).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // With parameter 'next' we use 'vm' function to access data of individual employee
          next(vm => {
            vm.employee_id = doc.data().employee_id
            vm.name = doc.data().name
            vm.dept = doc.data().dept
            vm.position = doc.data().position
          })
        })
      })
    },

    // We are setting atcher to watch for data and fetch it when data is grabed from database for single employee
    watch: {
      '$route': 'fetchData'
    },

    methods: {
        // Creating method that will fetch data for single employee
        fetchData() {
            // Connecting to database and using '$route' - router to access params and employee id in them
            db.collection('employees').where('employees_id', '==', this.$route.params.employee_id).get()
            // We loop throught database with 'doc' property
            .then(querySnapshoot => {
                querySnapshoot.forEach(doc => {
                    // Here we access properies of employee
                    this.employee_id = doc.data().employee_id
                    this.name = doc.data().name
                    this.dept = doc.data().dept
                    this.position = doc.data().position
                })
            })
        },
        
        // Method that will update edited values and save them to database
        updateEmployee () {
        // Connecting to database and using '$route' - router to access params and employee id in them    
            db.collection('employees').where('employee_id', '==', this.$route.params.employee_id).get().then((querySnapshot) => {
            // We loop throught database with 'doc' property
            querySnapshot.forEach((doc) => {
                // Updating employee values
                doc.ref.update({
                    employee_id: this.employee_id,
                    name: this.name,
                    dept: this.dept,
                    position: this.position
                })
                // Redirecting to empleyee info page - 'viewEmployee.vue'
                .then(() => {
                this.$router.push({ name: 'view-employee', params: { employee_id: this.employee_id }})
                });
            })
            })
        }
        }
    }
</script>
