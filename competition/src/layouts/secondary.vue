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
        <router-link to="/" class="flex justify-center items-center rounded-2xl p-2" :class="[pathName == '/' ? 'bg-white' : 'hover:bg-white']">
          <p>Home</p>
        </router-link>
        <router-link to="/orders" class="flex justify-center items-center rounded-2xl p-2"  :class="[pathName == '/orders' ? 'bg-white' : 'hover:bg-white']">
          <p>Orders</p>
        </router-link>
        <router-link to="#" class="flex justify-center items-center rounded-2xl p-2"  :class="[pathName == '#' ? 'bg-white' : 'hover:bg-white']">
          <p>Promos</p>
        </router-link>
        <router-link to="#" class="flex justify-center items-center rounded-2xl p-2"  :class="[pathName == '#' ? 'bg-white' : 'hover:bg-white']">
          <p>Chat</p>
        </router-link>
      </div>
    </div>
  </section>
</template>
<script setup>
import NavigationBar from "@/components/NavigationBar.vue";
import {ref} from "vue";
const pathName = ref(window.location.pathname);
</script>