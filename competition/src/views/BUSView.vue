<template>
  <PrimaryLayout page-title="BUS" :remove-padding="true">
    <div class="min-h-screen flex flex-col">
      <Map/>

      <div class="warning-container">
        <div class="bg-gray-800 rounded-[22px] p-4 mb-4 opacity-95 text-white">
          <p class="text-center text-sm">BUS Feature Under Development.</p>
        </div>
      </div>

      <div class="w-96 bottom-5 h-12 left-1/2 -translate-x-1/2 flex items-center justify-center absolute opacity-95 bg-gray-800 rounded-[22px] shadow z-2">
        <div class="text-white flex items-center gap-14">
          <div class="w-6 h-6 bg-red-500 rounded-full"></div>
          <div class="w-6 h-6 bg-green-500 rounded-full"></div>
          <div class="w-6 h-6 bg-yellow-500 rounded-full"></div>
          <div class="w-6 h-6 bg-blue-500 rounded-full"></div>
        </div>
      </div>
    </div>
  </PrimaryLayout>
</template>

<script setup>
import Map from "@/components/MapBUS.vue";
import { onMounted, ref } from "vue";
import { useUserStore } from '@/stores/globalVars';

const user = useUserStore();
const balance = ref(null);
const showWarning = ref(true);

onMounted(async () => {
  balance.value = await user.getBalance;
});

setTimeout(() => {
  showWarning.value = false;
}, 5000);
</script>

<style>
@keyframes fade {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.warning-container {
  position: absolute;
  top: 25rem;
  left: 50%;
  transform: translateX(-50%);
  animation: fade 0s infinite;
}
</style>