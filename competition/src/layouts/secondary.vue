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
        <router-link to="#" class="flex justify-center items-center rounded-2xl p-2"  :class="[pathName == '#' ? 'bg-white' : 'hover:bg-white']" @click="openPromosModal">
          <p>Promos</p>
        </router-link>
        <router-link to="#" class="flex justify-center items-center rounded-2xl p-2"  :class="[pathName == '#' ? 'bg-white' : 'hover:bg-white']" @click="openChatModal">
          <p>Chat</p>
        </router-link>
      </div>
    </div>

    <div v-if="showPromosModal" class="modal">
      <div class="modal-content">
        <h2>Promos Coming Soon</h2>
        <p>Stay Tuned for exciting promotions!</p>
        <button @click="closePromosModal">Close</button>
      </div>
    </div>

    <div v-if="showChatModal" class="modal">
      <div class="modal-content">
        <h2>Chat Coming Soon</h2>
        <p>Chat feature is under development.</p>
        <button @click="closeChatModal">Close</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import NavigationBar from "@/components/NavigationBar.vue";
import {ref} from "vue";
const pathName = ref(window.location.pathname);
const showPromosModal = ref(false);
const showChatModal = ref(false);
const openPromosModal = () => {
  showChatModal.value= true;
}

const closePromosModal = () => {
  showPromosModal.value= true;
}

const openChatModal = () => {
  showChatModal.value = true;
};

const closeChatModal = () => {
  showChatModal.value = false;
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

button {
  margin-top: 16px;
}
</style>