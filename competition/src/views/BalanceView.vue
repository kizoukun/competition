<script setup>
import {onMounted, ref} from 'vue';
import api from '@/stores/api';
const balances = ref(null);

onMounted(() => {
  api.get("/user/balance/history").then((res) => {
    if(res.data.success) {
      balances.value = res.data.data;
      console.log(balances.value)
    }
  })
  .catch((err) => {
    console.error(err);
  })
})

</script>
<template>
  <PrimaryLayout page-title="Balance History" :is-loading="balances == null">
    <div v-if="balances" class="space-y-4 mt-8">
      <div class="w-full">
        <router-link to="/topup" class="inline-block w-full bg-green-500 hover:bg-green-600 duration-300 rounded-lg text-center p-3 text-white font-medium">TOPUP</router-link>
      </div>
      <div class="space-y-4 mt-4">
        <div
            class="flex justify-between items-center border-b border-black"
            v-for="(balance, index) in balances"
            :key="index"
        >
          <div>
            <p>Rp{{ parseInt(balance.balanceAfter).toLocaleString('ID-id')}}</p>
            <p>{{ balance.description }}</p>
          </div>
          <div
              :class="[balance.type === 1 ? 'text-green-500': 'text-red-500']"
              class="font-medium"
          >
            <p>{{ balance.type === 1 ? `+Rp${parseInt(balance.amount).toLocaleString('ID-id')}` : `-Rp${parseInt(balance.amount).toLocaleString('ID-id')}` }}</p>
          </div>
        </div>
      </div>
    </div>
  </PrimaryLayout>
</template>