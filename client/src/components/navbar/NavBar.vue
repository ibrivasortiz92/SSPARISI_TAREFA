<template>
  <nav>
    <!-- HEADER -->
    <ModalForm v-if="showModal" @close="closeModal" @update="$emit('update')" />
    <h2>Registro de clientes</h2>
    <div @click="openModal()" class="btn">Novo cliente</div>
  </nav>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import ModalForm from './ModalForm.vue';

export default defineComponent({
  name: 'NavBar',
  components: {ModalForm},
  setup() {
    // VARIABLES
    const showModal = ref(false);

    // METHODS
    const openModal = () => {
      showModal.value = true;
    };
    const closeModal = () => {
      showModal.value = false;
    };

    return {showModal, openModal, closeModal};
  },
});
</script>

<style scoped>
nav {
  background: #fff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  font-weight: bold;
}
.btn {
  color: #173c5e;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.1s linear;
}
.btn:hover {
  color: #1f448a;
}
</style>
