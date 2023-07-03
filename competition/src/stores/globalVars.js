import { ref, computed } from 'vue';
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
   const user = ref(null);
   const getUser = computed(() => user.value);
   function setUser(newUser) {
       user.value = newUser;
   }
   return { getUser, setUser };
});
