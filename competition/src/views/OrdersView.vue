<template>
    <SecondaryLayout>
        <div class="mt-4 p-3">
            <div class="px-8">
                <select class="rounded-full bg-white border border-black text-black p-2 w-full">
                    <option disabled selected>Pilih Transportasi</option>
                    <option value="krl">KRL</option>
                    <option value="lrt">LRT</option>
                    <option value="mrt">MRT</option>
                    <option value="tjkt">TRANSJAKARTA</option>
                </select>
            </div>
            <div class="grid grid-cols-2 gap-8 mt-8">
                <div class="bg-white rounded-lg shadow-lg p-2 text-center">
                    <FontAwesomeIcon icon="fa-solid fa-ticket-simple" size="1x" class="text-3xl text-yellow-500" />
                    <p class="text-lg font-bold">One Day Pass</p>
                    <p class="text-lg font-medium">Rp10.000</p>
                </div>
                <div class="bg-white rounded-lg shadow-lg p-2 text-center">
                    <FontAwesomeIcon icon="fa-solid fa-ticket" size="1x" class="text-3xl text-yellow-500" />
                    <p class="text-lg font-bold">One Week Pass</p>
                    <p class="text-lg font-medium">Rp99.000</p>
                </div>
                <div class="bg-white rounded-lg shadow-lg p-2 text-center">
                    <FontAwesomeIcon icon="fa-solid fa-ticket" size="1x" class="text-3xl text-yellow-500" />
                    <p class="text-lg font-bold">One Month Pass</p>
                    <p class="text-lg font-medium">Rp299.000</p>
                </div>
            </div>
        </div>
    </SecondaryLayout>
</template>