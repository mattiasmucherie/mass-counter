<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" @click="close">
      <div class="modal" @click.stop>
        <header class="modal-header">
          <h1>{{name}}</h1>
        </header>
        <section class="modal-body">
          <slot name="body">I'm the default body!</slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            I'm the default footer!
            <button type="button" class="btn-green" @click="close">Close me!</button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  props: ["name", "numBeer", "beer8"],
  methods: {
    close() {
      this.$emit("close");
    }
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background: #fff;
  box-shadow: 2px 2px 2px 2px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}
.modal-header,
.modal-footer {
  padding: 0;
  display: flex;
}
.modal-header {
  border-bottom: 1px solid #eeeeee;
  color: #009bd0;
  justify-content: space-between;
}
.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
}
.modal-body {
  position: relative;
  padding: 20px 10px;
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
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
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