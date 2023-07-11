
<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="space-y-4">
      <img src="/not-found.svg" alt="404 Not Found" />
      <p class="text-center text-lg font-medium">{{ message }}</p>
      <div class="w-full flex justify-center">
        <router-link to="/" class="text-center  rounded-lg bg-blue-500 text-white p-2 px-4">Back to Home</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    message: {
      type: String,
      required: false,
      default: "Halaman tidak ditemukan"
    }
  }
})
</script>