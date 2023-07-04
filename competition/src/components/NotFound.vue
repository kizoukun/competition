
<template>
  <div>
    <h1>404</h1>
    <p>{{ message }}</p>
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