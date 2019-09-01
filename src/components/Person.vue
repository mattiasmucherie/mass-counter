<template>
  <div class="name-container">
    <span
      class="name"
      @dblclick="removeMassOnePerson({person:`${name}`, currentNumBeer: numBeer})"
    >{{name}}</span>
    <span class="numBeer">{{numBeer.toFixed(1)}}</span>

    <button
      :disabled="beerLoading"
      class="smallPlus"
      style="font-size:1rem"
      @click="addMassOnePerson({person:`${name}`,amount:0.5})"
    >+</button>
    <button
      :disabled="beerLoading"
      class="bigPlus"
      style="font-size:2rem"
      @click="addMassOnePerson({person:`${name}`,amount:1})"
    >+</button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Person",
  props: ["name", "numBeer"],
  data() {
    return {};
  },
  computed: {
    ...mapState(["beerLoading"])
  },
  methods: {
    ...mapActions(["addMassOnePerson"]),
    ...mapActions(["removeMassOnePerson"])
  }
};
</script>

<style lang="scss">
@media (min-width: 1281px) {
  .name-container {
    display: grid;
    grid-template-columns: auto 100px 50px 50px 50px auto;
  }
}
@media (max-width: 1281px) {
  .name-container {
    display: grid;
    grid-template-columns: auto 25% 20% 10% 10% auto;
  }
}
.name {
  grid-column-start: 2;
  grid-column-end: 3;
  font-weight: 400;
  align-self: center;
  font-size: 1.2rem;
  text-align: left;
}
.numBeer {
  grid-column-start: 3;
  grid-column-end: 4;
  font-weight: 900;
  align-self: center;
  font-size: 1.4rem;
}
button {
  border: none;
  background: rgba(220, 130, 26, 0.8);
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
  border-radius: 1rem;
  margin: 0.1rem;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1),
    0 2px 4px 0 rgba(14, 30, 37, 0.12);
  &:disabled {
    color: #fff;
    background: rgba(170, 170, 170, 0.7);
  }
}
.smallPlus {
  grid-column-start: 4;
  grid-column-end: 5;
  font-weight: 800;
}
.bigPlus {
  grid-column-start: 5;
  grid-column-end: 6;
  font-weight: 800;
}
</style>
