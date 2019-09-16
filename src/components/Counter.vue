<template>
  <div class="container">
    <h1 class="title">
      Maß Counter
      <span :class="{clingBeer: beerLoading}">🍻</span>
    </h1>
    <div v-if="!loading" class="leaderboard-container">
      <div class="name-container">
        <span class="smallPlus">0.5</span>
        <span class="bigPlus">1</span>
        <span class="beer8">&lt; 24h</span>
      </div>
      <div v-for="(person, index) in listOfNames" v-bind:key="`${person.name}${index}`">
        <!-- When you click on a person, you should get the option to add/remove beers and get the log of the beers that you have had -->
        <Person
          v-if="person.name != 'Guest'"
          :name="person.name"
          :numBeer="person.numBeer"
          :beer8="person.beer8"
        ></Person>
      </div>
      <h1 class="total">Total: {{totalMass.toFixed(1)}} 🍺</h1>
      <div v-for="person in listOfNames" v-bind:key="person.name">
        <Person v-if="person.name == 'Guest'" v-bind:name="person.name" :numBeer="person.numBeer"></Person>
      </div>
    </div>
    <div v-else>
      <span class="spinner">🍺</span>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import Person from "./Person.vue";
import { mapState, mapActions } from "vuex";
export default {
  name: "Counter",
  components: {
    Person
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["fetchMass"])
  },
  computed: {
    ...mapState({
      loading: state => state.loading,
      listOfNames: state => state.listOfNames,
      totalMass: state => state.totalMass,
      beerLoading: state => state.beerLoading
    })
  },
  created() {
    this.fetchMass();
  }
};
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  padding: 1rem;
  width: 80%;
}
.leaderboard-container {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.title {
}

.spinner {
  font-size: 124px;
  display: inline-block;
  animation: spin 1s infinite linear;
}
.clingBeer {
  display: inline-block;
  animation: spin 1s infinite linear;
}
.clingBeerClick {
  display: inline-block;
  animation: spin 500ms infinite linear;
}
@-moz-keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
