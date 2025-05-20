<script setup>
import JobCard from '@/components/pages/jobs/JobCard.vue';

defineProps({
    jobs: { type: Array, required: true},
    grid: { type: String, required: false}
})
</script>

<template>
    <section>
        <div class="row">
            <div class="container mx-auto py-4">
                <div :class="['d-grid grid', grid]">
                    <JobCard v-for="(job, index) in jobs" :key="index" :job="job"/>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
section{
    // background-color: #E3F2FD;
}
</style>