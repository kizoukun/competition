<template>
  <div className="map-container max-w-[600px] min-h-screen mt-4 opacity-60" ref="mapContainer"></div>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import mapboxGl from 'mapbox-gl';

const mapContainer = ref(null);
const map = ref(null);

onMounted(() => {
  mapboxGl.accessToken = 'pk.eyJ1IjoiaXJmYW5zYWZ4IiwiYSI6ImNsanU2OXgwNDEyMnMzaW5naHVwZzIzZnMifQ.W8qR7DfmEEhwdvpWR6BEpA';
  map.value = new mapboxGl.Map({
    container: mapContainer.value,
    style: 'mapbox://styles/irfansafx/cljy0lk38004a01pk0whtd4yq',
    center: [106.865036, -6.175110],
    zoom: 12
  });

  map.value.on('idle', () => {
    map.value.resize();
  });

  onUnmounted(() => {
    map.value.remove();
  });
});
</script>