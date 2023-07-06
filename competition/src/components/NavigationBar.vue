<template>

  <nav
      class="bg-green-600 fixed max-w-[600px] w-full mx-auto z-20 top-0 border-b border-gray-600 text-white p-3"
      @click="toggleSearchBar"
      :class="{ 'active': isSearchBarActive }"
  >
    <div class="flex justify-between items-center">
      <div
          class="relative flex-grow mr-2 search-bar"
          :class="{ 'active': isSearchBarActive }"
      >
        <input
            ref="searchInput"
            class="w-full rounded-full p-2 text-zinc-800 focus:ring-opacity-0 focus:ring-0 focus:ring-offset-0"
            :class="{ 'pl-10': isSearchBarActive }"
            placeholder="Find services, food, places"
            @focus="activateSearchBar"
            @blur="deactivateSearchBar"
        />
        <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" v-show="isSearchBarActive">
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
        </span>
      </div>
      <div class="flex justify-center items-center bg-white rounded-full overflow-hidden w-11 h-11">
        <img :src="'https://www.gravatar.com/avatar/' + useUserStore().getUser.image + `?time=${Date.now()}`" alt="Profile Picture" class="w-full h-full object-cover rounded-full">
      </div>
    </div>
  </nav>
</template>
<script setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { useUserStore } from "@/stores/globalVars";

library.add(fas);

import {ref} from "vue";
const isSearchBarActive = ref(false);
const activateSearchBar = () => {
  isSearchBarActive.value = true
};
const deactivateSearchBar = () => {
  isSearchBarActive.value = false
};
const toggleSearchBar = () => {
  const inputElement = ref.searchInput;
  if (inputElement && !inputElement.contains(event.target)) {
    deactivateSearchBar()
  }
}
</script>

<style scoped>
  nav .search-bar {
    transition: flex-grow 0.3s;
    flex-grow: 0;
  }

  nav.active .search-bar {
    flex-grow: 1;
  }

  nav.active .search-bar input {
    padding-right: 2rem;
  }

  nav .search-bar input {
    transition: padding-right 0.3s;
    padding-right: 2.75rem;
  }
</style>