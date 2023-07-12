<template>
    <SecondaryLayout>
        <div class="mt-4 p-3">
            <div class="px-8">
                <select class="rounded-full bg-white border border-black text-black p-2 w-full" v-model="transporation" @change="changeTransporation">
                    <option disabled selected value="null">Pilih Transportasi</option>
                    <option value="krl">KRL</option>
                    <option value="lrt">LRT</option>
                    <option value="mrt">MRT</option>
                    <option value="tjkt">TRANSJAKARTA</option>
                </select>
            </div>
            <div class="grid grid-cols-2 gap-8 mt-8" v-if="tickets.length > 0">
                <div class="bg-white rounded-lg shadow-lg p-2 text-center" 
                    v-for="(ticket, index) in tickets" 
                    :key="index"
                >
                    <FontAwesomeIcon :icon="ticket.price > 30000 ? 'fa-solid fa-ticket' : 'fa-solid fa-ticket-simple'" size="1x" class="text-3xl text-yellow-500" />
                    <p class="text-lg font-bold">{{ ticket.name }}</p>
                    <p class="text-lg font-medium">Rp{{ parseInt(ticket.price).toLocaleString('ID-id') }}</p>
                </div>
            </div>
            <div v-else-if="tickets.length < 1 && error" class="mt-12 text-center">
                <p class="text-red-500 text-2xl font-bold">{{ error }}</p>
            </div>
            <div v-else class="flex justify-center items-center mt-12">
                <FontAwesomeIcon icon="fa-solid fa-circle-notch" spin size="4x" class="text-gray-500" />
            </div>
        </div>
    </SecondaryLayout>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref } from 'vue';
import api from '@/stores/api';

const tickets = ref([]);
const transporation = ref(null);
const error = ref(null);


async function changeTransporation() {
    tickets.value = [];
    error.value = null;
    api.get("/transportations/" + transporation.value + "/tickets").then((res) => {
        if(res.data.success) {
            tickets.value = res.data.data;
        } else {
            error.value = res.data.message;
        }
    }).catch((err) => {
        console.log(err);
    })
}

</script>