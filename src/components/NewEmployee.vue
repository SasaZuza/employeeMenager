<template>
    <div id="new-employee">

        <h3>New Employee</h3>

        <div class="row">
            <!-- Creating form and event that will trigger function to save employee data -->
            <form @submit.prevent="saveEmployee" class="col s12">

                <!-- Creating row as a input field and bind dat to database  -->
                <!-- Row for ID -->
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="employee_id" required>
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

    name: 'new-employee',

    data() {
        // Returns all values from database as null for start
        return {
            employee_id: null,
            name: null,
            dept: null,
            position: null 
        }
    },

    methods: {
        // Method that we use to save employee info to database
        saveEmployee() {
            // We connect to database and use 'add' method
            db.collection('employees').add({
                // Adding this data to database by using entered values into input fields with 'v-model' 
                employee_id: this.employee_id,
                name: this.name,
                dept: this.dept,
                position: this.position
            })
            // After entering data we use router to get back to homepage
            .then(docRef => this.$router.push('/')
            )
            // If error occurs we display that error in console
            .catch(error => console.log(err))
        }
    }
    
}
</script>

