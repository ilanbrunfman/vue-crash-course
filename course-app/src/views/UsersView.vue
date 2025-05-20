<script setup>
import { ref, computed } from 'vue';
import { useStore } from '@/stores/index.js'

// components
import Wrapper from '@/components/shared/Wrapper.vue'

const store = useStore()

const users = computed(() => { return store.users })

</script>

<template>
    <Wrapper wrapperClass="about">
        <template #main>
            
            <section>
                <div class="row">
                    <div class="container pt-6 mx-auto">
                        <h1>Users Page</h1>
                        <ul>
                            <li v-for="(user, index) in store.users" :key="index">{{ user }}</li>
                        </ul>
                    </div>
                </div>
            </section>

        </template>
    </Wrapper>
</template>

<style lang="scss" scoped></style>