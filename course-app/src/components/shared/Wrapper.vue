<script setup>
import Navbar from '@/components/shared/Navbar.vue'
import Toast from '@/components/shared/Toast.vue'

defineProps({
  wrapperClass: { type: String,  }
})

</script>

<template>
    <div :class="['', wrapperClass]">
        <Navbar />
        <Toast />
        
        <main >
            <slot name="main" />
        </main>

    </div>
</template>