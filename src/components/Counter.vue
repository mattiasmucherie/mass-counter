<template>
  <div class="container">
    <h1 class="title">
      Maß Counter
      <span class="cling-beer">🍻</span>
    </h1>
    <div class="names-container">
      <div class="name-container" v-for="name in listOfNames" v-bind:key="name">
        <span class="name">{{name}}</span>
        <button :disabled="loading" class="smallPlus" @click="addBeer(`${name}`,0.5)">+</button>
        <button :disabled="loading" class="bigPlus" @click="addBeer(`${name}`,1)">+</button>
      </div>
    </div>
    <h1>Total 🍺: {{totalMass}}!</h1>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init.js";

export default {
  name: "Counter",
  data() {
    return {
      listOfNames: [
        "Axelina",
        "Andrea",
        "Filip",
        "Fredrik",
        "Hampus",
        "Klara",
        "Malin",
        "Mattias",
        "Trainee 18"
      ],
      loading: false,
      totalMass: 0
    };
  },
  methods: {
    addBeer(user, amount) {
      this.loading = true;
      const ref = db.collection("mass").doc(`${user}`);
      ref
        .update({
          numBeer: firebase.firestore.FieldValue.increment(amount)
        })
        .then(() => {
          this.loading = false;
          this.totalMass += amount;
        });
    },
    fetchMass() {
      this.totalMass = 0;
      const ref = db.collection("mass");
      ref.get().then(snap => {
        snap.forEach(doc => {
          this.totalMass += doc.data().numBeer;
        });
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
  grid-template-columns: auto 85px 50px 50px auto;
}
.name {
  grid-column-start: 2;
  grid-column-end: 3;
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
  }
}
.smallPlus {
  grid-column-start: 3;
  grid-column-end: 4;
  font-size: 1rem;
}
.bigPlus {
  grid-column-start: 4;
  grid-column-end: 5;
  font-size: 2rem;
}
</style>
