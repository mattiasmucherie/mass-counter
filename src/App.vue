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
}
body {
  margin: 0 0;
  padding: 0;
  background: rgb(0, 155, 208);
  background: linear-gradient(
    225deg,
    rgba(0, 155, 208, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  min-height: 100vh;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}
</style>
