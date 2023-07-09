<script>
import { defineComponent } from 'vue';
import Spinner from "@/components/Spinner.vue";

export default defineComponent({
  components: {Spinner},
  props: {
    pageTitle: {
      type: String,
      required: true
    },
    backLink: {
      type: String,
      required: false,
      default: "/"
    },
    removePadding: {
      type: Boolean,
      required: false,
      default: false
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: false
    }
  }
})
</script>
<template>
  <div :class="{'p-3': !removePadding }" class="flex flex-col min-h-screen">
    <div :class="{'p-3': removePadding }" class="flex gap-4">
      <router-link :to="backLink"><font-awesome-icon icon="fa-solid fa-arrow-left-long"></font-awesome-icon></router-link>
      <h1>{{  pageTitle }}</h1>
    </div>
    <Spinner v-if="isLoading" />
    <slot v-if="!isLoading" />
  </div>
</template>
