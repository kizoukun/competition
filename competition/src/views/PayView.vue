<script setup>
import {onMounted, ref} from 'vue';
import { useRouter } from "vue-router";
import api from "@/stores/api";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
const route = useRouter();
const transaction = ref(null);
const loading = ref(false);
const params = route.currentRoute.value.params;
function check() {
  loading.value = true;
  api.get("/transactions/" + params.id).then((res) => {
    if(res.data.success) {
      transaction.value = res.data.data;
    } else {
      route.push({
        name: "notFound",
        query: {
          message: res.data.message
        }
      });
    }
  })
  .catch((err) => {
    console.error(err);
    route.push({name: "notFound", params: {message: "Terjadi kesalahan pada server"}});
  })
  .finally(() => {
    loading.value = false;
  })
}
onMounted(async () => {
  check();
})
</script>

<template>
  <PrimaryLayout page-title="Checkout" v-if="transaction">
    <section class="space-y-4 flex-1">
      <div class="w-full p-3 flex justify-center" v-if="transaction.qrImage">
        <img :src="transaction.qrImage" class="" alt="QR Code">
      </div>
      <h1 class="text-lg font-bold text-center">STATUS: {{ transaction.status.toUpperCase() }}</h1>
      <p class="text-lg font-bold text-center">Topup Amount: Rp{{ parseInt(transaction.amount).toLocaleString("ID-id")}}</p>
    </section>
    <section>
      <button type="button" @click="check()" :disabled="loading" class="disabled:bg-gray-300 bg-green-600 p-2 w-full text-center rounded-lg text-white"><FontAwesomeIcon v-if="loading" icon="fa-solid fa-circle-notch" spin class="mr-2" />Check Status</button>
    </section>
  </PrimaryLayout>
</template>