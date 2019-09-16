<template>
  <div class="name-container">
    <span class="name" @click="showModal">{{name}}</span>
    <span class="numBeer">{{numBeer.toFixed(1)}}</span>
    <span v-if="beer8 != 0" class="beer8">{{ beer8 }}</span>
    <Modal
      :numBeer="numBeer"
      :beer8s="beer8"
      :name="name"
      v-show="isModalVisible"
      @close="closeModal"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Modal from "./Modal.vue";
export default {
  name: "Person",
  components: {
    Modal
  },
  props: ["name", "numBeer", "beer8"],
  data() {
    return {
      isModalVisible: false
    };
  },
  computed: {
    ...mapState(["beerLoading"])
  },
  methods: {
    ...mapActions(["addMassOnePerson"]),
    ...mapActions(["removeMassOnePerson"]),
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  }
};
</script>

<style lang="scss">
.name-container {
  padding: 0.5rem;
  margin: 0.2rem;
  display: grid;
  grid-template-columns: auto 45% 25% 20% auto;
  grid-template-areas: " . names numBeer beer8 .";
}

.name {
  grid-area: names;
  text-align: left;
  font-size: 1.2rem;
}
.numBeer {
  grid-area: numBeer;
  text-align: center;
  font-size: 1.1rem;
}
.beer8 {
  grid-area: beer8;
  text-align: right;
}
button {
  &:disabled {
  }
}
// .smallPlus {

// }
// .bigPlus {

// }
</style>
