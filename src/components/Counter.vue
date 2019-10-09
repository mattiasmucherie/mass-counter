<template>
  <div class="container">
    <h1 :class="{title: !loading}">
      Maß Counter
      <span>🍻</span>
    </h1>
    <div v-if="!loading" class="leaderboard-container">
      <div class="leaderboard-header">
        <div class="name-container">
          <span class="numBeer">Total (L)</span>
          <span class="beer8">&lt; 24h</span>
        </div>
      </div>
      <div v-for="(person, index) in listOfNames" v-bind:key="`${person.name}${index}`">
        <Person :name="person.name" :numBeer="person.numBeer" :beer8="person.beer8"></Person>
      </div>
      <h1 class="total">Total: {{totalMass.toFixed(1)}} 🍺</h1>
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
  padding: 2rem 0 1rem 0;
  width: 85%;
}
@media (min-width: 640px) {
  .container {
    width: 50%;
  }
}

@media (min-width: 768px) {
  .container {
    width: 40%;
  }
}

@media (min-width: 1024px) {
  .container {
    width: 35%;
  }
}

@media (min-width: 1200px) {
  .container {
    width: 25%;
  }
}

.leaderboard-container {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  .leaderboard-header {
    background: #003547;
    color: #eee;
  }
  div:nth-child(2) {
    background: #f7fdff;
  }
  div:nth-child(3) {
    background: #e4f8ff;
  }
  div:nth-child(4) {
    background: #d0f3ff;
  }
  div:nth-child(5) {
    background: #bceeff;
  }
  div:nth-child(6) {
    background: #a9e9ff;
  }
  div:nth-child(7) {
    background: #95e4ff;
  }
  div:nth-child(8) {
    background: #82dfff;
  }
  div:nth-child(9) {
    background: #6edaff;
  }
  div:nth-child(10) {
    background: #5ad5ff;
  }
  div:nth-child(11) {
    background: #47d0ff;
  }
  div:nth-child(12) {
    background: #33cbff;
    border-radius: 0 0 10px 10px;
  }
}

.title {
  padding: 1rem 0.3rem 1rem 0.3rem;
  font-size: 2.2rem;
  margin: 0;
  background: #003547;
  border-radius: 15px 15px 0px 0px;
  color: #eee;
}
.total {
  font-size: 2.3rem;
  margin-bottom: 0.5rem;
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
