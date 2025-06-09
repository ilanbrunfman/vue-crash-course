<script setup>

const props = defineProps({
    job: { type: Object, required: true},
})

</script>

<template>
    <div :class="['card', job.active ? 'active' : 'false']">
        <div class="card-header">
            <p class="fs-16 fw-700 mb-0-5">{{ job.title }} - <router-link class="clr-light" :to="`/${job.username}`">{{ job.firstName }} {{ job.lastName }}</router-link></p>
            <p class="fs-14 fw-400 mb-0">{{ job.description }} {{ job.active }}</p>
        </div>
        <div class="card-header"></div>
        <div class="card-footer"></div>
    </div>
</template>