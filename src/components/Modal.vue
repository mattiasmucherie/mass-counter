<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" @click="close">
      <div class="modal" @click.stop>
        <header class="modal-header">
          <h1>
            {{name}}: {{numBeer.toFixed(1)}}
            <span :class="{clingBeer: beerLoading}">🍻</span>
          </h1>
        </header>
        <section class="modal-body">
          <button
            :disabled="beerLoading"
            class="smallPlus"
            @click="addMassOnePerson({person:`${name}`,amount:0.5})"
          >0.5</button>
          <button
            :disabled="beerLoading"
            class="bigPlus"
            @click="addMassOnePerson({person:`${name}`,amount:1})"
          >1</button>
          <button
            :disabled="beerLoading"
            class="bigMinus"
            @click="removeMassOnePerson({person:`${name}`, currentNumBeer: numBeer})"
          >-1</button>
        </section>
        <footer class="modal-footer">
          <button type="button" class="btn-green" @click="getLog">Show Log</button>
          <div class="log-container" v-if="showLog">
            <div
              class="log-items"
              v-for=" (log, index) in logList"
              :key="index"
            >Amount: {{log.amount}}, Time: {{getDate(log.time)}}</div>
          </div>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Modal",
  props: ["name", "numBeer", "beer8"],
  data() {
    return {
      showLog: false,
      logList: []
    };
  },
  methods: {
    ...mapActions(["addMassOnePerson"]),
    ...mapActions(["removeMassOnePerson"]),
    close() {
      this.$emit("close");
      this.showLog = false;
      this.logList = [];
    },
    getLog() {
      this.showLog = !this.showLog;
      const objIndex = this.listOfNames.findIndex(obj => obj.name == this.name);
      this.logList = this.listOfNames[objIndex].time.reverse();
    },
    getDate(date) {
      let minutes = new Date(date).getMinutes();
      minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const hours = new Date(date).getHours();
      const day = new Date(date).getDate();
      const month = new Date(date).getMonth();
      const year = new Date(date).getYear() + 1900;

      return `${hours}:${minutes} ${day}/${month + 1}/${year}`;
    }
  },
  computed: {
    ...mapState(["beerLoading", "listOfNames"])
  }
};
</script>

<style lang="scss">
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5) !important;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background: #e4f8ff;
  box-shadow: 2px 2px 2px 2px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  width: 80%;
}
@media (min-width: 640px) {
  .modal {
    width: 50%;
  }
}

@media (min-width: 768px) {
  .modal {
    width: 40%;
  }
}

@media (min-width: 1024px) {
  .modal {
    width: 35%;
  }
}

@media (min-width: 1200px) {
  .modal {
    width: 25%;
  }
}
.modal-header,
.modal-footer {
  padding: 1rem;
  text-align: center;
  h1 {
    margin: 0.5rem;
  }
}
.modal-header {
  border-bottom: 1px solid #eee;
  color: #002b39;
  justify-content: space-between;
}
.modal-footer {
  border-top: 1px solid #eee;
  justify-content: flex-end;
  padding: 0.5rem;
  .log-container {
    max-height: 200px;
    overflow-y: auto;
  }
  .log-items {
    background: #e4f8ff !important;
    padding: 0.2rem;
  }
}
.modal-body {
  position: relative;
  padding: 20px 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  button {
    border: none;
    width: 50px;
    height: 50px;
    background: rgba(220, 130, 26, 1);
    color: #fff;
    font-size: 1.5rem;
    border-radius: 1rem;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    font-family: inherit;
    text-align: center;
    padding: 0;
    .smallPlus {
      font-size: 1rem;
    }
    .bigPlus {
      font-size: 2rem;
    }
    &:disabled {
      background: hsla(32, 13%, 45%, 1);
    }
  }
}
.btn-close {
  border: none;
  font-size: 20px;
  padding: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}
.btn-green {
  width: 200px;
  height: 50px;
  color: #091114;
  background: transparent;
  border-radius: 1rem;
  font-family: inherit;
  border: none;
  font-size: 2rem;
}
.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.1s ease;
}
</style>