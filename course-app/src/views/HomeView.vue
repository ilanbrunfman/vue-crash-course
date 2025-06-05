<script setup>
import { markRaw } from 'vue';
import { useStore } from '@/stores/index.js'
import Wrapper from '@/components/shared/Wrapper.vue'
import AddJobModal from '@/components/pages/jobs/AddJobModal.vue';
import Jobs from '@/components/pages/jobs/Jobs.vue'
import UserFollowers from '@/components/pages/users/UserFollowers.vue';

const store = useStore()

const addJobModal = () => {
    store.ADD_MODAL({ component: markRaw(AddJobModal), })
}


</script>

<template>
    <Wrapper wrapperClass="home">
        <template #main>

            <UserFollowers/>
            
            <!-- <Hero 
               layout="center dark py-6"
               title="Become a Vue Dev"
               subTitle="Find the Vue job that fits yours skills and needs"
            /> -->

            <section>
                <div class="container mx-auto">

                    <div class="row">
                        <div class="col-12 col-md-8 d-flex align-items-center justify-between mb-2 mx-auto">
                            <h2 class="sub-title fw-700 pt-1">Job list:</h2>
                            <button class="btn btn-primary fw-16 fw-bold" @click="addJobModal">Add job</button>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12 col-md-8 mx-auto">
                            <Jobs />
                        </div>
                    </div>

                </div>
            </section>

        </template>
    </Wrapper>
</template>

