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
// @media (min-width: 1281px) {
//   .name-container {
//     display: grid;
//     grid-template-columns: auto 100px 50px 50px 50px 50px auto;
//   }
// }
@media (max-width: 1281px) {
  .name-container {
  }
}
.name {
}
.numBeer {
}
button {
  &:disabled {
  }
}
// .smallPlus {

// }
// .bigPlus {

// }
.beer8 {
}
</style>
