<template>
  <div className="map-container max-w-[600px] min-h-screen mt-4" ref="mapContainer"></div>
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

  const lines = [
    {
      name: 'Jakarta Kota - Bogor',
      color: '#FF0000',
      stations: [
        {lng: 106.81479241177937, lat: -6.13754287457013, name: 'Station Jakarta Kota'},
        {lng: 106.82300492694924, lat: -6.1411245996975055, name: 'Station Jayakarta'},
        {lng: 106.82703906898007, lat: -6.15015013503394, name: 'Station Mangga Besar'},
        {lng: 106.8277467571765, lat: -6.160978194831742, name: 'Station Sawah Besar'},
        {lng: 106.83046148220296, lat: -6.166677844515377, name: 'Station Juanda'},
        {lng: 106.8306557668306, lat: -6.176688355044945, name: 'Station Gambir'},
        {lng: 106.83262312998215, lat: -6.1858316878712, name: 'Station GondangDia'},
        {lng: 106.84127947733998, lat: -6.198592151272379, name: 'Station Cikini'},
        {lng: 106.85009234353652, lat: -6.21040034728162, name: 'Station Manggarai'}
      ]
    },
    {
      name: 'Jatinegara - Kampung Bandan',
      color: '#00FF00',
      stations: [
        {lng: 106.87050905746929, lat: -6.214983637909057, name: 'Station Jatinegara'},
        {lng: 106.85990659483156, lat: -6.212548468475177, name: 'Station Matraman'},
        {lng: 106.85009234353652, lat: -6.21040034728162, name: 'Station Manggarai'},
        {lng: 106.82349505363248, lat: -6.20241328856703, name: 'Station Sudirman'},
        {lng: 106.81589021460195, lat: -6.200777782041229, name: 'Station Karet'},
        {lng: 106.8109340011772, lat: -6.185709996829772, name: 'Station Tanah Abang'},
        {lng: 106.80123542799788, lat: -6.155176292156071, name: 'Station Duri'},
        {lng: 106.80075044589353, lat: -6.14441635908635, name: 'Station Angke'},
        {lng: 106.82869222497749, lat: -6.132483970643506, name: 'Station Kampung Bandan'},
        {lng: 106.83681259353938, lat: -6.1449965071332, name: 'Station Rajawali'},
        {lng: 106.84154709623431, lat: -6.161666072608725, name: 'Station Kemayoran'},
        {lng: 106.84455793317068, lat: -6.174417954187888, name: 'Station Pasar Senen'},
        {lng: 106.85088045636746, lat: -6.186154314054718, name: 'Station Gang Sentiong'},
        {lng: 106.85659148568095, lat: -6.193722252325287, name: 'Station Kramat'},
        {lng: 106.86235706914937, lat: -6.209127541324889, name: 'Station Pondok Jati'},
        {lng: 106.87050905746929, lat: -6.214983637909057, name: 'Station Jatinegara'}
      ]
    },
    {
      name: 'Duri - Tangerang',
      color: '#0000FF',
      stations: [
        {lng: 106.80123542799788, lat: -6.155176292156071, name: 'Station Duri'},
        {lng: 106.78978927528933, lat: -6.161699729211488, name: 'Station Grogol'},
        {lng: 106.77515448644857, lat: -6.183536911820199, name: 'Station Pesing'},
        {lng: 106.76301593822024, lat: -6.202793904434083, name: 'Station Taman Kota'},
        {lng: 106.75150253124568, lat: -6.226720149369301, name: 'Station Bojong Indah'},
        {lng: 106.7386631944522, lat: -6.252809486573299, name: 'Station Rawa Buaya'},
        {lng: 106.72561018614482, lat: -6.279120644853641, name: 'Station Kali Deres'},
        {lng: 106.71857602848798, lat: -6.29905234457948, name: 'Station Poris'},
        {lng: 106.70995393110596, lat: -6.320572168322294, name: 'Station Batu Ceper'},
        {lng: 106.70118636157473, lat: -6.342318281624019, name: 'Station Tanah Tinggi'},
        {lng: 106.69804623217338, lat: -6.363747896270091, name: 'Station Tangerang'}
      ]
    },
    {
      name: 'Kampung Bandan - Jakarta Kota',
      color: '#FF00FF',
      stations: [
        {lng: 106.82869222497749, lat: -6.132483970643506, name: 'Station Kampung Bandan'},
        {lng: 106.8114632, lat: -6.1404476, name: 'Station Jakarta Kota'}
      ]
    }
  ];

  for (const line of lines) {
    const routeCoordinates = line.stations.map(({ lng, lat }) => [lng, lat]);

    const routeFeature = {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: routeCoordinates
      },
      properties: {
        name: line.name
      }
    };

    map.value.on('load', () => {
      map.value.addSource(line.name, {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [routeFeature]
        }
      });

      map.value.addLayer({
        id: line.name,
        type: 'line',
        source: line.name,
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': line.color,
          'line-width': 3
        }
      });

      const markerOptions = {
        color: line.color,
        stations: line.stations
      };

      addStationMarkers(markerOptions);
    });
  }

  const addStationMarkers = (options) => {
    const {color, stations} = options;
    const hubStations = ['Station Manggarai', 'Station Jatinegara', 'Station Duri', 'Station Kampung Bandan'];

    for (let i = 0; i < stations.length; i++) {
      const {lng, lat, name} = stations[i];

      let markerColor = color;
      if (hubStations.includes(name)) {
        markerColor = '#F2D022'; // Set different color for hub stations
      }

      const marker = new mapboxGl.Marker({
        color: markerColor,
        draggable: false
      })
          .setLngLat([lng, lat])
          .addTo(map.value);

      const popup = new mapboxGl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 25
      }).setHTML(`<b>${name}</b><br>Lat: ${lat}<br>Lng: ${lng}`);

      marker.setPopup(popup);
    }
  };

  map.value.on('idle', () => {
    map.value.resize();
  });

  onUnmounted(() => {
    map.value.remove();
  });
});
</script>
