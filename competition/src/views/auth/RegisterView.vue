<script setup>
import { ref } from 'vue';
import router from '@/router';
import api from '@/stores/api';
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
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
const loading = ref(false);

async function register() {
  error.value = null;
  loading.value = true;
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
      .finally(() => {
        loading.value = false;
      })
}

</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-8 space-y-4">
    <h1 class="text-3xl font-bold">Register Now</h1>
    <p class="text-gray-500 text-lg font-medium">Please enter the details below to continue</p>
    <form @submit.prevent="register" class="space-y-4 w-full">
      <input class="w-full bg-gray-200 p-3 rounded-md text-black font-medium" type="email" v-model="form.email" placeholder="Input your email" required />
      <input class="w-full bg-gray-200 p-3 rounded-md text-black font-medium" type="password" v-model="form.password" placeholder="******" required />
      <input class="w-full bg-gray-200 p-3 rounded-md text-black font-medium" type="password" v-model="form.passwordConfirmation" placeholder="Password Confirmation" required />
      <input class="w-full bg-gray-200 p-3 rounded-md text-black font-medium" type="text" v-model="form.firstName" placeholder="First Name" required />
      <input class="w-full bg-gray-200 p-3 rounded-md text-black font-medium" type="text" v-model="form.lastName" placeholder="Last Name" required />
      <input class="w-full bg-gray-200 p-3 rounded-md text-black font-medium" type="text" v-model="form.phoneNumber" placeholder="Phone Number" required />
      <input class="w-full bg-gray-200 p-3 rounded-md text-black font-medium" type="text" v-model="form.address" placeholder="Address" required />
      <p class="text-end font-medium">Already have an account? <router-link to="/auth/login" class="underline text-blue-400 hover:text-blue-500">Login NOW!</router-link></p>
      <p v-if="error" class="text-red-500 text-lg">{{ error }}</p>
      <button type="submit" class="w-full bg-blue-500 disabled:bg-blue-400 p-2 px-4 rounded-full hover:bg-blue-600 text-white text-lg font-medium" :disabled="loading">
        <FontAwesomeIcon icon="fa-solid fa-circle-notch mr-2" v-if="loading" spin />
        REGISTER
      </button>
    </form>
  </div>
</template>