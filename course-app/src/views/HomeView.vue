<script setup>
import { ref, markRaw, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { useStore } from '@/stores/index.js'

// shared
import Wrapper from '@/components/shared/Wrapper.vue'
import AddJobModal from '@/components/pages/jobs/AddJobModal.vue';
import Hero from '@/components/shared/Hero.vue'

// pages/jobs
import Jobs from '@/components/pages/jobs/Jobs.vue'
import JobCard from '@/components/pages/jobs/JobCard.vue'

// const router = useRouter()
const store = useStore()

const activeJobId = ref(null)
const state = ref({
    jobs: []
})
state.value.jobs = computed (() => {
    return store.jobs
        .filter((job) => job.id !== '404')
        .map((job) => {
            const user = store.users.find((user) => user.id === job.userId)
            return({
                ...job,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                active: job.id === activeJobId.value, // if statement, then true or false
            })
        })
})

const toggleJob = (job) => {
    activeJobId.value = job.id
}

const addJobModal = () => {
    store.ADD_MODAL({ component: markRaw(AddJobModal), })
}


</script>

<template>
    <Wrapper wrapperClass="home">
        <template #main>
            
            <!-- <Hero 
               layout="center dark py-6"
               title="Become a Vue Dev"
               subTitle="Find the Vue job that fits yours skills and needs"
            /> -->

            <section>
                <div class="container mx-auto pt-6">

                    <div class="row">
                        <div class="col-12 col-md-8 d-flex align-items-center justify-between mb-2 mx-auto">
                            <h2 class="sub-title fw-700 pt-1">Job list:</h2>
                            <button class="btn btn-primary fw-16 fw-bold" @click="addJobModal">Add job</button>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12 col-md-8 mx-auto">
                            <div v-if="state.jobs.length > 0" class="cards">
                                <div v-for="(job, index) in  state.jobs" :key="index" :class="['card', job.active ? 'active' : 'false']" @click="toggleJob(job)">
        
                                    <div class="card-header">
                                        <p class="fs-16 fw-700 mb-0-5">{{ job.title }} - <router-link :to="`/${job.username}`">{{ job.firstName }} {{ job.lastName }}</router-link></p>
                                        <p class="fs-14 fw-400 mb-0">{{ job.description }} {{ job.active }}</p>
                                    </div>
                                    <div class="card-header"></div>
                                    <div class="card-footer"></div>
                                    
                                </div>
                            </div>
        
                            <p v-else class="text-center">Jobs list is empty!</p>
                        </div>
                    </div>

                </div>
            </section>

        </template>
    </Wrapper>
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

        &-header{}
        &-body{}
        &-footer{}
    }
}
</style>