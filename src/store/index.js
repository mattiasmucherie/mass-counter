import Vue from "vue";
import Vuex from "vuex";
import db from "@/firebase/init.js";
import firebase from "firebase/app";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    totalMass: 0,
    listOfNames: [],
    beerLoading: false
  },
  getters: {},
  mutations: {
    SET_LOADING(state, status) {
      state.loading = status;
    },
    SET_BEER_LOADING(state, status) {
      state.beerLoading = status;
    },
    ADD_TO_MASS(state, amount) {
      state.totalMass += amount;
    },
    RESET_TOTAL_MASS(state) {
      state.totalMass = 0;
    },
    RESET_LIST_OF_NAMES(state) {
      state.listOfNames = [];
    },
    ADD_PERSON_TO_LIST(state, person) {
      state.listOfNames.push(person);
    },
    ORDER_LIST_OF_NAME(state) {
      state.listOfNames.sort((a, b) =>
        a.numBeer < b.numBeer ? 1 : b.numBeer < a.numBeer ? -1 : 0
      );
    },
    ADD_MASS_TO_PERSON(state, { person, amount }) {
      const objIndex = state.listOfNames.findIndex(obj => obj.name == person);
      state.listOfNames[objIndex].numBeer += amount;
      state.listOfNames[objIndex].beer8 += amount;
    },
    REMOVE_MASS_TO_PERSON(state, { person }) {
      const objIndex = state.listOfNames.findIndex(obj => obj.name == person);
      state.listOfNames[objIndex].numBeer -= 1;
      state.listOfNames[objIndex].beer8 -= 1;
    },
    BEER_LAST_EIGHT_HOURS(state) {
      try {
        state.listOfNames.forEach(obj => {
          obj.time.forEach(timeObj => {
            if (Date.now() - timeObj.time < 43200000) {
              const objIndex = state.listOfNames.findIndex(
                objI => objI.name == obj.name
              );
              state.listOfNames[objIndex].beer8 += timeObj.amount;
            }
          });
        });
      } catch (err) {
        console.log(err);
      }
    }
  },
  actions: {
    // Fetch user data async. and store in Vuex state.
    async fetchMass({ dispatch, commit }) {
      commit("RESET_TOTAL_MASS");
      commit("RESET_LIST_OF_NAMES");
      commit("SET_LOADING", true);
      await dispatch("fetchMassData");
      commit("ORDER_LIST_OF_NAME");
      commit("BEER_LAST_EIGHT_HOURS");
      commit("SET_LOADING", false);
      console.log("fetched DAta");
    },
    fetchMassData({ commit }) {
      return new Promise((res, rej) => {
        const ref = db.collection("mass");
        ref
          .get()
          .then(snap => {
            snap.forEach(doc => {
              commit("ADD_PERSON_TO_LIST", {
                name: doc.id,
                numBeer: doc.data().numBeer,
                time: doc.data().time,
                beer8: 0
              });
              if (doc.id !== "Guest") {
                commit("ADD_TO_MASS", doc.data().numBeer);
              }
            });

            res("success");
          })
          .catch(err => {
            commit("SET_LOADING", false);
            console.log("Error fetching data");
            rej(err);
          });
      });
    },
    // Adds the amount to one person and updates store as well
    async addMassOnePerson({ dispatch, commit }, { person, amount }) {
      commit("SET_BEER_LOADING", true);
      commit("ADD_MASS_TO_PERSON", { person, amount });
      if (person !== "Guest") commit("ADD_TO_MASS", amount);
      await dispatch("addMassOnePersonData", { person, amount });
    },
    addMassOnePersonData({ commit }, { person, amount }) {
      return new Promise((res, rej) => {
        const ref = db.collection("mass").doc(`${person}`);
        ref
          .update({
            numBeer: firebase.firestore.FieldValue.increment(amount),
            time: firebase.firestore.FieldValue.arrayUnion({
              time: Date.now(),
              amount
            })
          })
          .then(() => {
            commit("SET_BEER_LOADING", false);
            res("success");
          })
          .catch(err => {
            commit("SET_BEER_LOADING", false);
            rej(err);
          });
      });
    },
    // Removes a mass to one person and updates store as well
    async removeMassOnePerson(
      { dispatch, commit },
      { person, currentNumBeer }
    ) {
      if (currentNumBeer >= 1) {
        commit("SET_BEER_LOADING", true);
        commit("ADD_MASS_TO_PERSON", { person, amount: -1 });
        if (person !== "Guest") commit("ADD_TO_MASS", -1);

        await dispatch("removeMassOnePersonData", { person });
      }
    },
    removeMassOnePersonData({ commit }, { person }) {
      return new Promise((res, rej) => {
        const ref = db.collection("mass").doc(`${person}`);
        ref
          .update({
            numBeer: firebase.firestore.FieldValue.increment(-1),
            time: firebase.firestore.FieldValue.arrayUnion({
              time: Date.now(),
              amount: -1
            })
          })
          .then(() => {
            commit("SET_BEER_LOADING", false);
            res("success");
          })
          .catch(err => {
            commit("SET_BEER_LOADING", false);
            rej(err);
          });
      });
    }
  }
});
