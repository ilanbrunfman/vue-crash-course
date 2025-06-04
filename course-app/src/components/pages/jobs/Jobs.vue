<script setup>
import { ref, computed } from 'vue';
import { useStore } from '@/stores/index.js'

import JobCard from '@/components/pages/jobs/JobCard.vue';

// defineProps({
//     jobs: { type: Array, required: true},
//     grid: { type: String, required: false}
// })

const store = useStore()

const activeJobId = ref(null)
const state = ref({
    jobs: [],
    items: [],
})

state.value.jobs = computed (() => {

    const currentUser = store.users
        .find(user => user.id === store.getUser.user.id)

    const followers = store.users
        .filter(user => currentUser.following.includes(user.email))
        

    const list = store.jobs
        .filter(job => {
            return (
                job.userId === currentUser.id || followers.some(follower => follower.id === job.userId)
            )
        })
        .map(job => {
            const user = store.users.find((user) => user.id === job.userId)
            return({
                ...job,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                active: job.id === activeJobId.value, // if statement, then true or false
            })
        })

    return list
})

const toggleJob = (job) => {
    activeJobId.value = job.id
}
</script>

<template>
    <div v-if="state.jobs.length > 0" class="cards">
        <div v-for="(job, index) in  state.jobs" :key="index" :class="['card', job.active ? 'active' : 'false']" @click="toggleJob(job)">

            <div class="card-header">
                <p class="fs-16 fw-700 mb-0-5">{{ job.title }} - <router-link class="clr-light" :to="`/${job.username}`">{{ job.firstName }} {{ job.lastName }}</router-link></p>
                <p class="fs-14 fw-400 mb-0">{{ job.description }} {{ job.active }}</p>
            </div>
            <div class="card-header"></div>
            <div class="card-footer"></div>
            
        </div>
    </div>

    <p v-else class="text-center">Jobs list is empty!</p>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/partials/variables" as var;
.cards{
    .card{
        background-color: var(--background);
        padding: 10px;
        border-radius: 10px;
        margin-bottom: 10px;

        &.active{
            background-color:red;
        }

        @media (min-width: var.$md) {
            // padding: 12px 16px;
            padding: 20px;
            margin-bottom: 20px;
        }

        &-follower{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-width: 120px;
            position: relative;
            padding: 10px;
            border: solid 1px rgba(var(--darkRGB), 0.125);
            border-radius: 6px;
        }

        &-header{}
        &-body{}
        &-footer{}
    }
}
</style>