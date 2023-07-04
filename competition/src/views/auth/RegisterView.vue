<script setup>
import { ref } from 'vue';
import router from '@/router';
import api from '@/stores/api';
defineOptions({
  name: 'RegisterView',
})
const form = ref({
  email: '',
  password: '',
  passwordConfirmation: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  address: '',
})
const error = ref(null);

async function register() {
  error.value = null;
  api.post("/auth/register", form.value)
      .then(response => {
        console.log(response.data);
        if(response.data.success) {
          router.push('/auth/login');
        } else {
          error.value = response.data.message;
        }
      })
      .catch(error => {
        console.error(error);
        error.value = error.message;
      })
}

</script>

<template>
  <div>
    <form @submit.prevent="register" class="space-y-4">
      <label class="block">
        Email
        <input class="border border-black" type="email" v-model="form.email" />
      </label>
      <label class="block">
        Password
        <input class="border border-black" type="password" v-model="form.password" />
      </label>
      <label class="block">
        Password Confirmation
        <input class="border border-black" type="password" v-model="form.passwordConfirmation" />
      </label>
      <label class="block">
        First Name
        <input class="border border-black" type="text" v-model="form.firstName" />
      </label>
      <label class="block">
        Last Name
        <input class="border border-black" type="text" v-model="form.lastName" />
      </label>
      <label class="block">
        Phone Number
        <input class="border border-black" type="text" v-model="form.phoneNumber" />
      </label>
      <label class="block">
        Address
        <input class="border border-black" type="text" v-model="form.address" />
      </label>
      <p v-if="error" class="text-red-500 text-lg">{{ error }}</p>
      <button type="submit" class="bg-blue-500 p-2 px-4 rounded-lg hover:bg-blue-600 text-white">Register</button>
    </form>
  </div>
</template>