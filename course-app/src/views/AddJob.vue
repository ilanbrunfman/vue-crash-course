<script setup>
// shared
import Wrapper from '@/components/shared/Wrapper.vue'
import Hero from '@/components/shared/Hero.vue'

// pages/jobs
 import AddJobForm from '@/components/jobs/AddJobForm.vue';
</script>

<template>
    <Wrapper wrapperClass="add-job">
        <template #main>
            
            <Hero 
               layout="center dark py-6"
               title="Add new job"
               subTitle="Find the Vue job that fits yours skills and needs"
            />

            <AddJobForm />

        </template>
    </Wrapper>   
</template>