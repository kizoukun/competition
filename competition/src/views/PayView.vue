<template>
    <PrimaryLayout page-title="Scan QR">
        <section class="flex-1 mt-4">
            <video ref="videoElement" autoplay></video>
        </section>
        <section>
            <button class="bg-green-500 text-white rounded-3xl p-3 w-full">Scan QR</button>
        </section>
    </PrimaryLayout>
  </template>
  
  <script>
  export default {
    mounted() {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          this.$refs.videoElement.srcObject = stream;
        })
        .catch((error) => {
          console.error('Error accessing camera:', error);
        });
    },
  };
  </script>
  
  <style scoped>
  video {
    width: 100%;
    min-height: auto;
  }
  </style>
  