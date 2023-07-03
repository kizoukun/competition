<script setup>
import { logout } from '@/stores/api';
</script>

<template>
  <div>
    <button type="button" class="bg-red-500 p-2 px-4 rounded-lg text-white" @click="logout">Logout</button>
  </div>
</template>
