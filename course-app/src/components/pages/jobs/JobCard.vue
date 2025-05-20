<script setup>
import { ref, computed } from 'vue';

//
import IconMapPin from '@/components/icons/IconMapPin.vue';

const props = defineProps({
    job: { type: Object, required: true},
})
const showFullDescription = ref(false);

const truncatedDescription = computed(() => {
    let description = props.job.description;
    if(!showFullDescription.value){
        description = description.substring(0, 80) + '...';
    } 
    return description
})
const toggleFullDescription = () => {
    showFullDescription.value = !showFullDescription.value
}

</script>

<template>
    <div class="job">
        <p class="job-type fw-500">{{ job.type }}</p>
        <h2 class="job-title">{{ job.title }}</h2>
        <div class="job-description fw-400 mb-0-5 ">
            <p class=" ">{{ truncatedDescription }}</p>
            <!-- <span 
                @click="toggleFullDescription" 
                :class="['fw-400', showFullDescription ? '' : 'clr-green-400']"
            >{{ showFullDescription ? 'Less' : 'More' }}</span> -->
        </div>
        <p class="job-salary fw-500 clr-green-400 mb-1">{{ job.salary }} / Year</p>
        <hr class="mb-1"/>
        <div class="job-location mb-1">
            <IconMapPin />
            <p class="fw-500">{{ job.location }}</p>
        </div>
        <router-link :to="`jobs/${job.id}`" class="btn">Read More</router-link>
    </div>
</template>

<style lang="scss" scoped>
.job{
    background-color: var(--background);
        
    padding: 20px;
    // border: solid 1px rgba(#5d5d5d, 0.125);
    border-radius: 10px;

    &-title{
        font-size: clamp(16px, -0.875rem + 8.333vw, 20px);
        font-weight: bold;
    }
    &-type,
    &-description,
    &-salary,
    &-location{
        font-size: clamp(12px, -0.875rem + 8.333vw, 14px);
        line-height: 1.5;
    }

    &-location {
        display: flex;
        align-items: center;
        gap: 6px;
        color: var(--color-text);
        // color: #B71C1C;

        svg{
            width: 20px;
            height:var(--color-text);
            // height: 20px;
            fill: var(--color-text);
            // fill: #B71C1C;
        }
    }

    hr{
        height: 1px;
        border: none;
        background-color: rgba(#5d5d5d, 0.125);
    }

    .btn{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 40px;
        border-radius: 4px;
        background-color: #1f9c4a;
        text-decoration: none;
        color: #fff;
        font-size: 16px;
        font-weight: bold;

        &:hover{
            background-color: rgba(#1f9c4a, 0.8);
        }
    }
    
}
</style>