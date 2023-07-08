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
    }
  }
})
</script>
<template>
  <div class="flex flex-col p-3 min-h-screen">
    <div class="flex gap-4">
      <router-link :to="backLink"><font-awesome-icon icon="fa-solid fa-arrow-left-long"></font-awesome-icon></router-link>
      <h1>{{  pageTitle }}</h1>
    </div>
    <slot />
  </div>
</template>
