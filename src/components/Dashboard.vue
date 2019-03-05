<template>
    <div id="dashboard">

        <ul class="collection width-header">
            <li class="collection-header">
                <h4>Empolyees</h4>
            </li>

            <li v-for="employee in employees" v-bind:key="employee.id" class="collection-item">
                <div class="chip"> {{employee.dept}} </div>
                {{employee.employee_id}}:{{employee.name}}

               <router-link class="secondary-content" v-bind:to="{name:'view-employee', params: {employee_id: employee.employee_id}}">
                <i class="fa fa-eye"></i>
                </router-link>
            </li>
            
        </ul>

        <!-- Button to add new worker -->
        <div class="fixed-action-btn" >
            <router-link to="/new" class="btn-floating btn-large red" >
                <i class="fa fa-plus"></i>
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
            employees: []
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
    }

}
</script>

