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
@import url("https://fonts.googleapis.com/css?family=Germania+One&display=swap");
#app {
  font-family: "Germania One", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #002b39;
  margin: 0;
  padding: 0;
  min-height: 100vh;
}
body {
  margin: 0 0;
  padding: 0;
  background: #009bd0;
  background: radial-gradient(
    ellipse farthest-corner at center,
    #ffffff 0%,
    #009bd0 100%
  );
  min-height: 100vh;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}
</style>
