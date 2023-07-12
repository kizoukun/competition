<script setup>
import { useUserStore } from '@/stores/globalVars';
import {onMounted, ref, defineOptions} from "vue";
const user = useUserStore();
const balance = ref(null);
onMounted(async () => {
  balance.value = await user.getBalance;
})
</script>

<template>
  <SecondaryLayout>
    <div class="p-3 space-y-4 min-h-screen flex flex-col">
      <div class="bg-[#0F827B] rounded-xl p-3 text-white grid grid-cols-5 gap-5">
        <div class="col-span-2 bg-white text-black p-2 rounded-lg font-medium">
          <router-link to="/balance" v-if="balance !== undefined">
            <p>Your Balance</p>
            <p>Rp{{ parseInt(balance).toLocaleString('ID-id') }}</p>
            <p class="text-yellow-500">Check History</p>
            <p class="text-red-500 text-sm font-medium" v-if="balance < 10000">Low Balance</p>
          </router-link>
          <div v-else>
            <p class="text-red-500 text-sm font-medium">Failed to get balance</p>
          </div>
        </div>
        <div class="flex justify-center items-center">
          <router-link to="/pay" class="text-center">
            <FontAwesomeIcon icon="credit-card" size="2x"/>
            <p>Pay</p>
          </router-link>
        </div>
        <div class="flex justify-center items-center">
          <router-link to="/topup" class="text-center">
            <FontAwesomeIcon icon="circle-plus" size="2x"/>
            <p>Topup</p>
          </router-link>
        </div>
        <div class="flex justify-center items-center">
          <router-link to="/balance" class="text-center">
            <FontAwesomeIcon icon="fa-solid fa-clock-rotate-left" size="2x"/>
            <p>History</p>
          </router-link>
        </div>
      </div>
      <div>
        <div class="grid grid-cols-2 gap-11">
          <div class="flex flex-col items-center">
            <router-link to="/track/krl" class="bg-[#E8FCFC] p-8 rounded-[30px] shadow-black drop-shadow-xl text-red-500">
              <FontAwesomeIcon icon="train" size="7x"/>
            </router-link>
              <p class="text-lg font-bold mt-2 text-center">KRL</p>
          </div>
          <div class="flex flex-col items-center">
            <router-link to="/track/bus" class="bg-[#E8FCFC] p-8 rounded-[30px] shadow-black drop-shadow-xl text-yellow-200">
              <FontAwesomeIcon icon="bus" size="7x"/>
            </router-link>
            <p class="text-lg font-bold mt-2 text-center">BUS</p>
          </div>
          <div class="flex flex-col items-center">
            <router-link to="/track/mrt" class="bg-[#E8FCFC] p-8 rounded-[30px] shadow-black drop-shadow-xl text-green-500">
              <FontAwesomeIcon icon="subway" size="7x"/>
            </router-link>
            <p class="text-lg font-bold mt-2 text-center">MRT</p>
          </div>
          <div class="flex flex-col items-center">
            <div class="bg-[#E8FCFC] p-8 rounded-[30px] shadow-black drop-shadow-xl text-blue-500">
              <FontAwesomeIcon icon="train" size="7x"/>
            </div>
            <p class="text-lg font-bold mt-2 text-center">LRT</p>
          </div>
        </div>
      </div>
<!--      <button type="button" class="bg-red-500 p-2 px-4 rounded-lg text-white" @click="logout">Logout</button>-->
    </div>
  </SecondaryLayout>
</template>
