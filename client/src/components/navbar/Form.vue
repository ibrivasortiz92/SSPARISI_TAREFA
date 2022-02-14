// TEMPLATE
<template>
  <!-- FORM -->
  <form @submit.prevent="handleSubmit">
    <!-- NAME -->
    <label>Nome <span>*</span>:</label>
    <input type="text" required v-model="name" />

    <!-- CNPJ -->
    <label>CNPJ <span>*</span>:</label>
    <input type="text" required v-model="cnpj" />

    <!-- ADDRESS -->
    <label>Endereço:</label>
    <input type="text" v-model="address" />

    <!-- EMAILS -->
    <label>E-mails (ALT + ,):</label>
    <input type="email" v-model="tempEmail" @keyup.alt="addEmail" />
    <div v-if="errorEmail" class="error">{{ errorEmail }}</div>
    <div v-for="email in emails" :key="email" class="email">
      <span @click="deleteEmail(email)">{{ email }}</span>
    </div>

    <!-- SUBMIT -->
    <div class="submit">
      <button>Cadastrar</button>
    </div>
  </form>
</template>

// SCRIPT
<script lang="ts">
import {defineComponent, ref} from 'vue';
import Client from '../../types/Client';
import {BASE_URL} from '../../services/clients';

export default defineComponent({
  name: 'Form',
  emits: ['close', 'update'],
  setup(props, context) {
    // VARIABLES
    const name = ref('');
    const cnpj = ref('');
    const address = ref<string | null>(null);
    const tempEmail = ref('');
    const emails = ref<string[]>([]);
    const errorEmail = ref('');

    // METHODS
    const addEmail = (event: Event) => {
      const newEmail = (event.target as HTMLInputElement).value;
      if (newEmail) {
        const regexp = /\S+@\S+\.\S+/;
        if (regexp.test(newEmail)) {
          emails.value.push(tempEmail.value);
          errorEmail.value = '';
          tempEmail.value = '';
        } else {
          errorEmail.value = 'E-mail inválido';
        }
      }
    };
    const deleteEmail = (email: string) => {
      emails.value = emails.value.filter((item) => {
        return email !== item;
      });
    };
    const handleSubmit = () => {
      // CREATE CLIENT
      fetch(BASE_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: name.value,
          cnpj: cnpj.value,
          address: address.value,
          emails: emails.value,
        }),
      })
        .then(() => {
          // UPDATE COMPONENT
          context.emit('update');
        })
        .catch((err) => console.log(err));
    };

    // RETURN
    return {
      name,
      cnpj,
      address,
      tempEmail,
      emails,
      errorEmail,
      addEmail,
      deleteEmail,
      handleSubmit,
    };
  },
});
</script>

// STYLES
<style scoped>
form {
  max-width: 100%;
  margin: 0 auto;
  background: white;
  text-align: left;
  padding: 40px 0;
}
label {
  color: #777;
  display: inline-block;
  margin: 15px 0 5px;
  font-weight: bold;
}
input {
  display: block;
  padding: 10px 6px;
  width: 100%;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}
.email {
  display: inline-block;
  margin: 20px 10px 0 0;
  padding: 6px 12px;
  background: #eee;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  color: #777;
  cursor: pointer;
}
button {
  background: #0a6133;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
  font-size: 16px;
}
.submit {
  text-align: center;
}
.error {
  color: #ff0062;
  margin-top: 10px;
  font-size: 0.8em;
  font-weight: bold;
}
label span {
  color: #173c5e;
}
</style>
