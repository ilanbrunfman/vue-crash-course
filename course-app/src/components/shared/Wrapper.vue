<script setup>
import { useStore } from '@/stores/index.js'

import Navbar from '@/components/shared/Navbar.vue'
import Toast from '@/components/shared/Toast.vue'
import Modal from '@/components/shared/Modal.vue'

defineProps({
  wrapperClass: { type: String,  }
})

const store = useStore()

</script>

<template>
    <div :class="['', wrapperClass]">
        <Navbar />
        <Toast />

        <transition 
            v-for="(modal, index) in store.modals" 
            :key="index" 
            :appear="true" 
            :name="modal.transition || 'fade'"
        >
            <component 
                :is="modal.component" 
                :modal="modal"
                v-if="store.activeModal" 
            />
        </transition>
        
        <main >
            <slot name="main" />
        </main>

    </div>
</template>