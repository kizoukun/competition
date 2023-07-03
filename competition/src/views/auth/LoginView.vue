<script setup>
import { ref } from 'vue';
import api from '@/stores/api';
defineOptions({
  name: 'LoginView',
})
const form = ref({
  email: '',
  password: ''
})
const error = ref(null);

async function testData() {
  api.get('/test')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      })
}

async function login() {
  error.value = null;
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
}
</script>
<template>
    <div>
        <form @submit.prevent="login" class="space-y-4">
          <label class="block">
            Email
            <input class="border border-black" type="email" v-model="form.email" />
          </label>
          <label class="block">
            Password
            <input class="border border-black" type="password" v-model="form.password" />
          </label>
          <p v-if="error" class="text-red-500 text-lg">{{ error }}</p>
          <button type="submit" class="bg-blue-500 p-2 px-4 rounded-lg hover:bg-blue-600 text-white">Login</button>
        </form>
        <button type="button" class="bg-green-500 p-2 px-4 rounded-lg text-white" @click="testData">testData</button>
    </div>
</template>
