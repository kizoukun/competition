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

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrain, faBus, faSubway, faCirclePlus, faCreditCard } from '@fortawesome/free-solid-svg-icons';

library.add(faTrain, faBus, faSubway, faCirclePlus, faCreditCard);
</script>

<template>
  <section>
    <NavigationBar />
  </section>
  <section class="pt-[65px]">
    <div class="p-3 space-y-4 min-h-screen flex flex-col">
      <div class="bg-[#0F827B] rounded-xl p-3 text-white grid grid-cols-5 gap-5">
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
          <FontAwesomeIcon icon="credit-card" size="2x"/>
        </div>
        <div class="flex justify-center items-center">
          <FontAwesomeIcon icon="circle-plus" size="2x"/>
        </div>
        <div class="flex justify-center items-center">
          <p>Explore</p>
        </div>
      </div>
      <div>
        <div class="grid grid-cols-2 gap-11">
          <div class="flex flex-col items-center">
            <div class="bg-[#E8FCFC] p-8 rounded-[30px] shadow-black drop-shadow-xl text-red-500">
              <FontAwesomeIcon icon="train" size="7x"/>
            </div>
              <p class="text-sm text-center">KRL</p>
          </div>
          <div class="flex flex-col items-center">
            <div class="bg-[#E8FCFC] p-8 rounded-[30px] shadow-black drop-shadow-xl text-yellow-200">
              <FontAwesomeIcon icon="bus" size="7x"/>
            </div>
            <p class="text-sm text-center">BUS</p>
          </div>
          <div class="flex flex-col items-center">
            <div class="bg-[#E8FCFC] p-8 rounded-[30px] shadow-black drop-shadow-xl text-green-500">
              <FontAwesomeIcon icon="subway" size="7x"/>
            </div>
            <p class="text-sm text-center">MRT</p>
          </div>
          <div class="flex flex-col items-center">
            <div class="bg-[#E8FCFC] p-8 rounded-[30px] shadow-black drop-shadow-xl text-blue-500">
              <FontAwesomeIcon icon="train" size="7x"/>
            </div>
            <p class="text-sm text-center">LRT</p>
          </div>
        </div>
      </div>
<!--      <button type="button" class="bg-red-500 p-2 px-4 rounded-lg text-white" @click="logout">Logout</button>-->
    </div>
  </section>
  <section id="mobilebar">
    <div class="block fixed bottom-0 w-full bg-[#0F827B] p-6 z-50 max-w-[600px] mx-auto text-black">
      <div class="grid grid-cols-4 bg-[#E8FCFC] p-5 rounded-3xl">
        <div class="flex justify-center items-center bg-white rounded-2xl p-2">
          <h1>Home</h1>
        </div>
        <div class="flex justify-center items-center active:bg-white rounded-2xl p-2">
          <h1>Promos</h1>
        </div>
        <div class="flex justify-center items-center active:bg-white rounded-2xl p-2">
          <h1>Orders</h1>
        </div>
        <div class="flex justify-center items-center active:bg-white rounded-2xl p-2">
          <h1>Chat</h1>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.text-4xl {
  font-size: 2.5rem;
}
.text-sm {
  font-size: 0.875rem;
}
</style>
