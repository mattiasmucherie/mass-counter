<template>
  <div class="container">
    <h1 class="title">
      Maß Counter
      <span class="cling-beer">🍻</span>
    </h1>
    <div v-if="!initialLoading" class="names-container">
      <div class="name-container" v-for="person in listOfNames" v-bind:key="person.name">
        <span class="name">{{person.name}}</span>
        <span class="numBeer">{{person.numBeer}}</span>
        <button :disabled="loading" class="smallPlus" @click="addBeer(`${person.name}`,0.5)">+</button>
        <button :disabled="loading" class="bigPlus" @click="addBeer(`${person.name}`,1)">+</button>
      </div>
    </div>
    <h1 v-if="!initialLoading">Total: {{totalMass}} 🍺</h1>
    <div v-else>
      <span class="spinner">🍺</span>
      <p>Loading</p>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init.js";

export default {
  name: "Counter",
  data() {
    return {
      listOfNames: [],
      loading: false,
      initialLoading: false,
      totalMass: 0
    };
  },
  methods: {
    addBeer(user, amount) {
      this.loading = true;
      const objIndex = this.listOfNames.findIndex(obj => obj.name == user);
      const ref = db.collection("mass").doc(`${user}`);
      ref
        .update({
          numBeer: firebase.firestore.FieldValue.increment(amount),
          time: firebase.firestore.FieldValue.arrayUnion(Date.now())
        })
        .then(() => {
          this.listOfNames[objIndex].numBeer += amount;
          this.loading = false;
          this.totalMass += amount;
        })
        .catch(err => {
          console.log(err);
        });
    },
    fetchMass() {
      this.totalMass = 0;
      this.initialLoading = true;
      const ref = db.collection("mass");
      ref.get().then(snap => {
        snap.forEach(doc => {
          if (doc.id !== "Guest") {
            this.listOfNames.push({
              name: doc.id,
              numBeer: doc.data().numBeer
            });
            this.totalMass += doc.data().numBeer;
          }
        });
        this.initialLoading = false;
      });
    }
  },
  created() {
    this.fetchMass();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1 {
  margin: 0 0;
  padding-top: 2rem;
}

.title {
  padding: 3rem;
}
.name-container {
  display: grid;
  grid-template-columns: auto 100px 50px 50px 50px auto;
}
.name {
  grid-column-start: 2;
  grid-column-end: 3;
  font-weight: 800;
  align-self: center;
}
.numBeer {
  grid-column-start: 3;
  grid-column-end: 4;
  font-weight: 800;
  align-self: center;
}
button {
  border: none;
  background: none;
  color: #dc821a;
  font-size: 2rem;
  cursor: pointer;
  border: 2px solid #dc821a;
  border-radius: 1rem;
  margin: 0.1rem;
  &:disabled {
    color: #aaa;
    border: 2px solid #aaa;
  }
}
.smallPlus {
  grid-column-start: 4;
  grid-column-end: 5;
  font-size: 1rem;
}
.bigPlus {
  grid-column-start: 5;
  grid-column-end: 6;
  font-size: 2rem;
}
.spinner {
  font-size: 124px;
  display: inline-block;
  animation: spin 1s infinite linear;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
