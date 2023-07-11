<script setup>
import { ref } from 'vue';
import api from '@/stores/api';
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
defineOptions({
  name: 'LoginView',
})
const form = ref({
  email: '',
  password: ''
})
const loading = ref(false);
const error = ref(null);

async function login() {
  error.value = null;
  loading.value = true;
  api.post('/auth/login', form.value)
      .then(response => {
        if(response.data.success) {
          // Save token to local storage
          localStorage.setItem("token", response.data.token);
          window.location.reload();
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
        <img src="/login.svg" alt="Login Now" class="w-96" />
        <h1 class="text-3xl font-bold">Login Now</h1>
        <p class="text-gray-500 text-lg font-medium">Please enter the details below to continue</p>
        <form @submit.prevent="login" class="space-y-4 w-full">
          <input class="w-full bg-gray-200 p-3 rounded-md text-black font-medium" type="email" v-model="form.email" placeholder="Input your email" required />
          <input class="w-full bg-gray-200 p-3 rounded-md text-black font-medium" type="password" v-model="form.password" placeholder="******" required />
          <p class="text-end font-medium">Need an account? <router-link to="/auth/register" class="underline text-blue-400 hover:text-blue-500">Register NOW!</router-link></p>
          <p v-if="error" class="text-red-500 text-lg">{{ error }}</p>
          <button type="submit" class="w-full bg-blue-500 disabled:bg-blue-400 p-2 px-4 rounded-full hover:bg-blue-600 text-white text-lg font-medium" :disabled="loading">
            <FontAwesomeIcon icon="fa-solid fa-circle-notch mr-2" v-if="loading" spin />
            LOGIN
          </button>
        </form>
    </div>
</template>
