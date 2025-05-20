<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router'
import { useStore } from '@/stores/index.js'

// shared
import Wrapper from '@/components/shared/Wrapper.vue'
import Hero from '@/components/shared/Hero.vue'

// pages/jobs
import Jobs from '@/components/pages/jobs/Jobs.vue'
import JobCard from '@/components/pages/jobs/JobCard.vue'

const store = useStore()
// const router = useRouter()

const jobs = computed(() => { return store.jobs })

// const testToast = () => {
//     store.setToast({ type: 'success' })
// }



</script>

<template>
    <Wrapper wrapperClass="home">
        <template #main>
            
            <Hero 
               layout="center dark py-6"
               title="Become a Vue Dev"
               subTitle="Find the Vue job that fits yours skills and needs"
            />

            <Jobs 
                :jobs="jobs"
                grid="grid-1 grid-md-2 grid-lg-3 gap-2"
            />

            
            <!-- <button @click="testToast()">Click Here</button> -->

        </template>
    </Wrapper>
</template>

<style lang="scss" scoped></style>