<script setup>
import { useStore } from '@/stores/index.js'
import IconX from '@/components/icons/IconX.vue';

const store = useStore()
const props = defineProps({
  modalClass: { type: String,  }
})

const closeModal = () => {
    store.REMOVE_MODAL()
}
</script>

<template>
    <div :class="['modal', modalClass]">
        <div class="modal-backdrop" @click="closeModal"></div>
        <div class="modal-container inner">
            <button class="modal-exit-btn" @click="closeModal"><IconX /></button>
            <slot name="modal" />
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>