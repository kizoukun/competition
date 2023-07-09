<template>
  <div class="map-container" ref="mapContainer"></div>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from "vue";

const mapContainer = ref(null);
const map = ref(null);

onMounted(() => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiaXJmYW5zYWZ4IiwiYSI6ImNsanU2OXgwNDEyMnMzaW5naHVwZzIzZnMifQ.W8qR7DfmEEhwdvpWR6BEpA';
  map.value = new mapboxgl.Map({
    container: mapContainer.value,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [106.865036, -6.175110],
    zoom: 5
  });

  // Add code here to display the KRL route on the map using mapbox-gl

  const routeCoordinates = [
    [106.865036, -6.175110], // Starting point
    [106.874618, -6.185392], // Waypoint 1
    [106.883625, -6.195362], // Waypoint 2
    [106.888726, -6.201591], // Waypoint 3
    [106.899116, -6.212075] // Destination
  ];

  const routeFeature = {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: routeCoordinates
    }
  };
  map.value.on('idle',function(){
    map.value.resize()
  })

  map.value.on('load', () => {
    map.value.addSource('route', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [routeFeature]
      }
    });

    map.value.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#ff0000',
        'line-width': 3
      }
    });
  });
});

onUnmounted(() => {
  map.value.remove();
});
</script>

<style scoped>
.map-container {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin-top: 30px;
  height: 600px;
  max-width: 600px;
  overflow: visible;
}
</style>
