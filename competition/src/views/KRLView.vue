<template>
  <PrimaryLayout page-title="KRL" :remove-padding="true">
    <div class="min-h-screen flex flex-col">
      <Map/>

      <div class="w-96 bottom-5 h-12 left-1/2 -translate-x-1/2 flex items-center justify-center absolute opacity-95 bg-gray-800 rounded-[22px] shadow z-2">
        <div class="text-white flex items-center gap-24">
          <div class="w-6 h-6 bg-red-500 rounded-full"></div>
          <div class="w-6 h-6 bg-red-500 rounded-full"></div>
          <div class="w-6 h-6 bg-red-500 rounded-full"></div>
        </div>
      </div>
    </div>
  </PrimaryLayout>
</template>

<script setup>
import Map from "@/components/Map.vue";
import { onMounted, ref } from "vue";
import { useUserStore } from '@/stores/globalVars';

const user = useUserStore();
const balance = ref(null);

onMounted(async () => {
  balance.value = await user.getBalance;
});
</script>