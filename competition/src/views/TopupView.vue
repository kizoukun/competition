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
    "amount": "19000",
  },
  {
    "amount": "49000",
  },
  {
    "amount": "99000",
  },
  {
    "amount": "190000",
  },
  {
    "amount": "490000",
  },
  {
    "amount": "990000",
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
        <h1 class="text-lg">Choose an amount</h1>
        <div class="grid grid-cols-3 gap-5">
          <div v-for="(list, index) of listAmounts" :key="index" @click="setAmount(list.amount)" class="bg-white shadow-lg rounded-lg p-2">
            Rp{{ parseInt(list.amount).toLocaleString('ID-id') }}
          </div>
        </div>
      </div>
      <div>
        <input type="number" v-model="amountTopup" placeholder="Atau tulis jumlah" class="border border-black p-2 rounded-lg" />
      </div>
      <div>
        <div>
          <h1 class="text-lg">Payment Method</h1>
          <div class="bg-white shadow-lg rounded-lg p-2" @click="paymentType = 'QRIS'">
            QRIS
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