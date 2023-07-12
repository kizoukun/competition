<script setup>
import { ref } from 'vue';
import api from '@/stores/api';
import router from '@/router';
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
const amountTopup = ref(null);
const paymentType = ref(null);
const error = ref(null);
const loading = ref(false);

function setAmount(amount) {
  amountTopup.value = amount;
}

const listAmounts = ref([
  {
    "amount": "10000",
    "icon": "fa-solid fa-coins"
  },
  {
    "amount": "20000",
    "icon": "fa-solid fa-money-bill"
  },
  {
    "amount": "50000",
    "icon": "fa-solid fa-money-bill-1"
  },
  {
    "amount": "100000",
    "icon": "fa-solid fa-money-bills"
  }
]);

async function topup() {
  loading.value = true;
  error.value = null;
  if(amountTopup.value == null) {
    error.value = "Please choose an amount";
    loading.value = false;
    return;
  }
  if(paymentType.value == null) {
    error.value = "Please choose a payment method";
    loading.value = false;
    return;
  }
  api.post("/transactions/create", {
    amount: amountTopup.value,
    paymentType: paymentType.value,
  }).then((response) => {
    console.log(response);
    if(response.data.success) {
      router.push('/topup/' + response.data.data.id);
    } else {
      error.value = response.data.message;
    }
  }).catch((error) => {
    console.error(error);
    error.value = error.message;
  }).finally(() => {
    loading.value = false;
  })
}

</script>

<template>
  <PrimaryLayout page-title="Topup">
    <section class="flex-1 space-y-4">
      <div>
        <h1 class="text-lg font-medium">Choose an amount</h1>
        <div class="grid grid-cols-2 gap-5 p-5">
          <div v-for="(list, index) of listAmounts" :key="index" @click="setAmount(list.amount)" class="bg-gray-100 shadow-lg rounded-[40px] p-5">
            <div class="text-center space-y-4">
              <FontAwesomeIcon :icon="list.icon" size="3x" class="text-yellow-500" />
              <p class="text-lg font-medium">Rp{{ parseInt(list.amount).toLocaleString('ID-id') }}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="flex items-center">
          <FontAwesomeIcon icon="fa-solid fa-square-plus" size="2x" class="text-yellow-500 mr-4" />
          <input type="number" v-model="amountTopup" placeholder="Atau tulis jumlah" class="text-md font-medium w-full rounded-xl p-2 border border-black bg-gray-200" />
        </div>
      </div>
      <div>
        <div class="space-y-4">
          <h1 class="text-lg font-medium">Payment Method</h1>
          <div class="bg-white shadow-lg rounded-lg p-2 flex justify-between items-center" @click="paymentType = 'QRIS'">
            <p>QRIS</p>
            <FontAwesomeIcon icon="fa-solid fa-circle-check" class="text-green-500 text-2xl" v-if="paymentType == 'QRIS'" />
          </div>
          <div class="bg-white shadow-lg rounded-lg p-2 flex justify-between items-center" @click="paymentType = 'BNIVA'">
            <p>BNI Virtual Account</p>
            <FontAwesomeIcon icon="fa-solid fa-circle-check" class="text-green-500 text-2xl" v-if="paymentType == 'BNIVA'" />
          </div>
        </div>
      </div>
    </section>
    <section>
      <p class="text-red-500 font-medium text-md" v-if="error">{{ error }}</p>
      <button
          type="click"
          class="disabled:bg-gray-300 bg-green-600 p-2 px-4 rounded-lg text-white w-full text-center"
          :disabled="amountTopup == null || paymentType == null"
          @click="topup"
      >
        <FontAwesomeIcon v-if="loading" icon="fa-solid fa-circle-notch" spin class="mr-2" />Topup
      </button>
    </section>
  </PrimaryLayout>
</template>