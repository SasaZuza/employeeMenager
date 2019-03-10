<template>
  <div id="app">

    <Navbar />

    <div class="container">
      <router-view/>
    </div>
    
  </div>
</template>

<script>
// Importing components that we created
import Navbar from './components/Navbar'

export default {
  name: 'App',

  // Here we register imported components
  components: {
    Navbar
  }

}
</script>



