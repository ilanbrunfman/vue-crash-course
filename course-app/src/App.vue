<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useStore } from '@/stores/index.js'

const store = useStore()

store.fetchUsers()
store.fetchJobs()

</script>

<template>
    <Suspense>
        <RouterView />
        <template #fallback>Loading..</template>
    </Suspense>
</template>

<style lang="scss" scoped></style>