<script>
import { defineComponent } from 'vue';

export default defineComponent({
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
    <slot />
  </div>
</template>
