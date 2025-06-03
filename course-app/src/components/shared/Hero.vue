<script setup>
import { computed } from 'vue';
defineProps({
    layout: { type: String, default: 'center' },
    title: { type: String, default: 'Title section goes here:' },
    subTitle: { type: String, default: 'Sub-title section goes here:'}
})
</script>

<template>
    <section :class="['hero', `hero-${layout}`]">
        <div class="container mx-auto">
            <div class="content">
                <h1 class="title fw-bold mb-1">{{ title }}</h1>
                <h3 class="sub-title fw-600">{{ subTitle }}</h3>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.hero{
    position: relative;
    width: 100%;
    background-color: #7E57C2;
    padding-top: 8.4rem;

    &.dark{
        .title{
            color: #fff;
        }
        .sub-title{
            color: #fff;
        }
    }

    &-center{
        .content{
            text-align: center;
        }
    }

    &-left{
        .content{}
    }
}
</style>