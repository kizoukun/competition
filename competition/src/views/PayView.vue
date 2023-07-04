<script setup>
import {onMounted, ref} from 'vue';
import { useRouter } from "vue-router";
import NotFound from "@/components/NotFound.vue";
import api from "@/stores/api";
// console.log(this.$route.params)
const route = useRouter();
const transaction = ref(null);
const params = route.currentRoute.value.params;
onMounted(async () => {
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
  });
})
</script>

<template>
  <div v-if="transaction" class="p-3 flex flex-col min-h-screen">
    <section class="space-y-4 flex-1">
      <div class="w-full p-3 flex justify-center" v-if="transaction.qrImage">
        <img :src="transaction.qrImage" class="" alt="QR Code">
      </div>
      <h1>{{ transaction.paymentName }}</h1>
      <h1>{{ transaction.status.toUpperCase() }}</h1>
      <p>Rp{{ parseInt(transaction.amount).toLocaleString("ID-id")}}</p>
    </section>
    <section>
      <button type="button" class="bg-green-600 p-2 w-full text-center rounded-lg text-white">Check Status</button>
    </section>
  </div>
</template>