<template>
  <div id="app">
    <div class="title-container">
    <h1>CareFinder</h1>
    </div>
    <RequestComponent />
  </div>
</template>

<script>
import RequestComponent from './components/RequestComponent.vue';

export default {
  name: 'App',
  components: {
    RequestComponent,
  },
};
</script>

<style>
* {
  font-family: 'Poppins', sans-serif;
}
.title-container {
  text-align: center;
}

.title-container h1 {
  font-size: 4em;
}
</style>
