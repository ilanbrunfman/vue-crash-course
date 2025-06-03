<script setup>
import { useStore } from '@/stores/index.js'
import UserCard from './UserCard.vue';
const store = useStore()
</script>

<template>
    <div class="row">
        <div class="users ">
            <UserCard v-for="(user, index) in store.users" :key="index" :user="user"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.users{
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column-reverse;
}
</style>