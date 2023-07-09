<template>
  <PrimaryLayout page-title="KRL">
    <div class="min-h-screen flex flex-col">
      <!-- Your KRL view content goes here -->
      <Map />
<!--      <button type="button" class="bg-red-500 p-2 px-4 rounded-lg text-white" @click="logout">Logout</button>-->
    </div>
  </PrimaryLayout>
</template>

<script setup>
import Map from "@/components/Map.vue";
import { logout } from '@/stores/api';
import { onMounted, ref } from "vue";
import { useUserStore } from '@/stores/globalVars';
import Primary from "@/layouts/primary.vue";
import PrimaryLayout from "@/layouts/primary.vue";

const user = useUserStore();
const balance = ref(null);

onMounted(async () => {
  balance.value = await user.getBalance;
});
</script>
