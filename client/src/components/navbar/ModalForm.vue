<template>
  <!-- MODAL FORM -->
  <div class="backdrop" @click.self="$emit('close')">
    <div class="modal">
      <!-- MODAL CLOSE -->
      <button @click="$emit('close')" class="modal-close">&times;</button>

      <!-- MODAL HEADER -->
      <div class="modal-header">
        <h2>Novo cliente</h2>
      </div>

      <!-- MODAL BODY -->
      <div class="modal-body">
        <Form @close="$emit('close')" @update="$emit('update')" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Form from './Form.vue';

export default defineComponent({
  name: 'ModalForm',
  components: {Form},
  emits: ['close', 'update'],
});
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}
.modal {
  max-width: 600px;
  padding: 20px;
  margin: 50px auto;
  background: white;
  border-radius: 10px;
  position: relative;
}
.modal-header {
  border-bottom: 1px solid #eee;
}
.modal-close {
  position: absolute;
  top: 0;
  right: 0;
  background: white;
  border: none;
  border-radius: 10px;
  margin: 0 10px;
  font-size: 30px;
  cursor: pointer;
}
</style>
