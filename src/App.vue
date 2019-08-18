<template>
  <div id="app">
    <Counter />
  </div>
</template>

<script>
import Counter from "./components/Counter.vue";

export default {
  name: "app",
  components: {
    Counter
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #002b39;
  margin: 0;
}
body {
  margin: 0 0;
  padding: 0 0;
  background: rgb(0, 155, 208);
  background: linear-gradient(
    45deg,
    rgba(0, 155, 208, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  height: 100vh;
}
</style>
