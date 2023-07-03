<script setup>
import { logout } from '@/stores/api';
import { useUserStore } from '@/stores/globalVars';
const user = useUserStore();
</script>

<template>
  <div class="p-3 space-y-4">
    <div class="bg-blue-500 rounded-xl p-3 text-white grid grid-cols-5 gap-5">
      <div class="col-span-2 bg-white text-black p-2 rounded-lg font-medium">
        <p>Rp5.093</p>
        <p class="text-red-500 text-sm font-medium">Low Balance</p>
      </div>
      <div class="flex justify-center items-center">
        <p>{{ user.getUser.firstName }}</p>
      </div>
      <div class="flex justify-center items-center">
        <p>{{ user.getUser.lastName }}</p>
      </div>
      <div class="flex justify-center items-center">
        <p>Explore</p>
      </div>
    </div>
    <button type="button" class="bg-red-500 p-2 px-4 rounded-lg text-white" @click="logout">Logout</button>
  </div>
</template>
