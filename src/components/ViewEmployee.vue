<template>
    <div id="view-employee">
        <!-- Adding data for employees -->
        <ul class="collection with-header">
            <li class="collection-header">
                <h4>{{name}}</h4>
            </li>
            <li class="collection-item">Employee ID#: {{employee_id}}</li>
            <li class="collection-item">Department: {{dept}}</li>
            <li class="collection-item">Position: {{position}}</li>
        </ul>
        
        <!-- Setting button to geting back to home page -->
        <router-link to="/" class="btn grey">Back</router-link>

        <!-- Button to delete  -->
         <button @click="deleteEmployee" class="btn red">Delete</button>

         <!-- Button to edit current worker -->
        <div class="fixed-action-btn" >
            <router-link v-bind:to="{ name:'edit-employee', params:{employee_id: employee_id}}" class="btn-floating btn-large red" >
                <i class="fa fa-user-edit"></i>
            </router-link>
        </div>

    </div>
</template>

<script>

// Here we import database from this file
import db from './firebaseInit'

export default {

    name: 'view-employee',

    data() {
        // Return all values from database as null for start
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

        // Method for deleting employee on clicking the button
        deleteEmployee () {
        if(confirm ('Are you sure?')) {
          // Connecting to database and using '$route' - router to access params and employee id in them
          db.collection('employees').where('employee_id', '==', this.$route.params.employee_id).get()
          .then((querySnapshot) => {
            // We loop throught database with 'doc' property
            querySnapshot.forEach((doc) => {
              // Here we use 'ref' object to delete data (employee) inside collection 
              doc.ref.delete();
              // We use router so it redirect us to homepage after deleting employee
              this.$router.push('/')
            })
          })
        }
      }
    }

  }

</script>  