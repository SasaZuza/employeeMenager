<template>

    <div id="dashboard">
        
        <!-- Input form for searching workers by name -->
        <div class="row">
            <div class="input-field col s4">
                <input type="text" v-model="search" placeholder="Filter workers by name...">
            </div>
        </div>

        <!-- Buttons for sorting workers by different params (name, dept, id...) -->
        <button class="orange btn" @click="sortBy('name')">
            <i class="far fa-id-badge"></i>
            by name
        </button>

        <button class="orange btn" @click="sortBy('dept')">
            <i class="fas fa-bezier-curve"></i>
            by sector
        </button>

        <button class="orange btn" @click="sortBy('employee_id')">
            <i class="fas fa-fingerprint"></i>
            by Workers ID
        </button>
        
        <ul class="collection with-header">

            <li class="collection-header center #ffd740 amber accent-2">                                
                <h4> 
                    <i class="fas fa-users red-text"></i>
                    Workers list:
                </h4>
            </li>            

            <li v-for="employee in filteredEmployees" v-bind:key="employee.id" class="collection-item #ffe57f amber accent-1">
                <div class="chip orange white-text"> {{employee.dept}} </div>
                {{employee.employee_id}} : {{employee.name}}

               <router-link class="secondary-content" v-bind:to="{name:'view-employee', params: {employee_id: employee.employee_id}}">
                <i class="fa fa-eye red-text"></i>
                </router-link>
            </li>
            
        </ul>

        <!-- Button to add new worker -->
        <div class="fixed-action-btn" >
            <router-link to="/new" class="btn-floating btn-large orange" >
                <i class="fa fa-plus red-text"></i>
            </router-link>
        </div>

    </div>

</template>

<script>
// Importing component and files:
// Here we import database from this file
import db from './firebaseInit'

export default {

    name: 'dashboard',

    data() {
        return {
            // Creating array that is currently empty
            employees: [],
            search: ''
        }
    },

    methods: {
      // This is function called by click event on buttons for sorting projects with parameter 
      sortBy(prop){
        // We use JS 'sort' method whis compares elements in projects array
        // We use ternary operator - if condition is true we return -1 (it means that order is not changed)
        // If condition is false we return 1 (it means that order of elements in array is changed)
        this.employees.sort((a,b) => a[prop] < b[prop] ? -1 : 1 )
      } 
    },
    
    // Life-cycle hook that runs when component is created
    created() {
        // We use 'db' to access our firestore collection with name of 'employees' 
        db.collection('employees').orderBy('dept').get().then(querySnapshot => {
            // We loop throught database with 'doc' property
            querySnapshot.forEach(doc => {
                // We create 'data' const as object to access different values from database 
                const data = {
                    'id': doc.id,
                    'employee_id': doc.data().employee_id,
                    'name': doc.data().name,
                    'dept': doc.data().dept,
                    'position': doc.data().position
                }
                // We push (add) values from database to array 'employees' created in 'data'
                this.employees.push(data)
            })
        })
    },

    // Propertie to filter workers by names inputed in search input field
    computed: {
        filteredEmployees: function() {
            return this.employees.filter((employee) => {
                return employee.name.match(this.search);
            })
        }
    }

}
</script>


<style scoped> 

    #dashboard{
        font-family: 'Hind', sans-serif;
        font-size: 18px;
    }

</style>
