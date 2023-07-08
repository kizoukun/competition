<template>
  <section>
    <NavigationBar />
  </section>
  <section class="pt-[65px]">
    <slot />
  </section>
  <section id="mobilebar">
    <div class="block fixed bottom-0 w-full bg-[#0F827B] p-6 z-50 max-w-[600px] mx-auto text-black">
      <div class="grid grid-cols-4 bg-[#E8FCFC] p-5 rounded-3xl">
        <div class="flex justify-center items-center bg-white rounded-2xl p-2">
          <h1>Home</h1>
        </div>
        <div class="flex justify-center items-center active:bg-white rounded-2xl p-2">
          <h1>Promos</h1>
        </div>
        <div class="flex justify-center items-center active:bg-white rounded-2xl p-2">
          <h1>Orders</h1>
        </div>
        <div class="flex justify-center items-center active:bg-white rounded-2xl p-2">
          <h1>Chat</h1>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import NavigationBar from "@/components/NavigationBar.vue";
</script>