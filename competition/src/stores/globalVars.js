import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import api from "@/stores/api";

export const useUserStore = defineStore('user', () => {
   const user = ref(null);
   const getUser = computed(() => user.value);
   function setUser(newUser) {
       user.value = newUser;
   }

   const getBalance = computed(async () => {
      try {
         const response = await api.get('/user/balance');
         if(!response.data.success) {
            return undefined;
         }
         return response.data?.data?.balance;
      } catch (err) {
         return undefined;
      }
   });
   return { getBalance, getUser, setUser };
});
