<script setup>
import { logout } from '@/stores/api';
import { useUserStore } from '@/stores/globalVars';
import {onMounted, ref} from "vue";
import NavigationBar from "@/components/NavigationBar.vue";
const user = useUserStore();
const balance = ref(null);
onMounted(async () => {
  balance.value = await user.getBalance;
})
</script>

<template>
  <section>
    <NavigationBar />
  </section>
  <section class="pt-[65px]">
    <div class="p-3 space-y-4 min-h-screen flex flex-col">
      <div class="bg-blue-500 rounded-xl p-3 text-white grid grid-cols-5 gap-5">
        <div class="col-span-2 bg-white text-black p-2 rounded-lg font-medium">
          <div v-if="balance !== undefined">
            <router-link to="/topup">Rp{{ parseInt(balance).toLocaleString('ID-id') }}</router-link>
            <p class="text-red-500 text-sm font-medium" v-if="balance < 10000">Low Balance</p>
          </div>
          <div v-else>
            <p class="text-red-500 text-sm font-medium">Failed to get balance</p>
          </div>
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
  </section>
  <section id="mobilebar">
    <div class="block fixed bottom-0 w-full bg-black p-2 z-50 max-w-[600px] mx-auto text-white">
      <div class="grid grid-cols-4">
        <div class="flex justify-center items-center">
          <h1>Home</h1>
        </div>
        <div class="flex justify-center items-center">
          <h1>Promos</h1>
        </div>
        <div class="flex justify-center items-center">
          <h1>Orders</h1>
        </div>
        <div class="flex justify-center items-center">
          <h1>Chat</h1>
        </div>
      </div>
    </div>
  </section>
</template>
