<script setup>
import {ref, markRaw, onBeforeMount, onMounted, onBeforeUnmount, computed} from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '@/stores/index.js'

import UserView from '@/views/UserView.vue';
import CurrentUserView from '@/views/CurrentUserView.vue';

const route = useRoute()
const router = useRouter()
const store = useStore()
const isValid = ref(false)

const profile =  computed(() => {
    return store.users.find((profile) => profile.username === route.params.username) 
})

onMounted(() => {
    if( profile.value && !isValid.value ) {
        isValid.value = true
    } else {
        router.replace({ name: 'page-not-found' })
    }
})

</script>

<template>
    <component 
        v-if="isValid"
        :is="store.getUser.user.id === profile.id ? CurrentUserView : UserView" 
    />
</template>