<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavigationBar from "@/components/NavigationBar.vue";
import { useUserStore } from "@/stores/globalVars";
import { onMounted, ref } from "vue";
import { getUser } from "@/stores/api";

const user = useUserStore()
const loading = ref(true);
onMounted(async () => {
  if(user.getUser == null) {
    user.setUser(await getUser());
  }
  loading.value = false;
})
</script>

<template>
  <div class="max-w-[600px] mx-auto min-h-screen w-full bg-white flex flex-col" v-if="!loading">
    <section>
      <NavigationBar />
    </section>
    <section class="flex-1 mt-[65px]">
      <RouterView />
    </section>
    <section>
      <h1>Footer</h1>
    </section>
    <section id="mobilebar">
      <div class="block fixed bottom-0 w-full bg-black p-2 z-50 max-w-[600px] mx-auto text-white">
        <div class="grid grid-cols-4">
          <div class="flex justify-center items-center">
            <h1>Home</h1>
          </div>
          <div class="flex justify-center items-center">
            <h1>Promos</h1>
          </div>
          <div class="flex justify-center items-center">
            <h1>Orders</h1>
          </div>
          <div class="flex justify-center items-center">
            <h1>Chat</h1>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>