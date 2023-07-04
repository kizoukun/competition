<script setup>
import { ref } from 'vue';
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
  console.log("TOPUP")
}

</script>

<template>
  <div class="flex flex-col p-3 min-h-screen">
    <section class="flex-1 space-y-4">
      <div class="flex gap-4">
        <router-link to="/"><font-awesome-icon icon="fa-solid fa-arrow-left-long"></font-awesome-icon></router-link>
        <h1>Topup</h1>
      </div>
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
        Topup
      </button>
    </section>
  </div>
</template>