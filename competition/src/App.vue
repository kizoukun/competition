<script setup>
import { RouterLink, RouterView } from 'vue-router'
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
  <div class="max-w-[600px] mx-auto bg-white min-h-screen" v-if="!loading">
    <RouterView v-slot="{ Component }">
        <component :is="Component" />
    </RouterView>
  </div>
</template>