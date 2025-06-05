<script setup>
import { computed } from 'vue';
import { useStore } from '@/stores/index.js';
import { useRouter } from 'vue-router';
import Modal from '@/components/shared/Modal.vue';
import IconX from '@/components/icons/IconX.vue';

const store = useStore()
const router = useRouter()

const props = defineProps({
    modal: { type: Object, required: true},
})

const user = computed(() => {
    return props.modal.data
})

const deleteUser = () => {
    if(user.value.type !== 'admin'){
        store.deleteUser(user.value)
        store.REMOVE_MODAL()
        store.getUser.user.type !== 'admin' ? router.push('/login') :  router.push('/users')
    } else {
        setTimeout(() => { store.setToast({ type: 'error', title: ``, message: 'Cannot delete Admin account' }) }, 100);
    }
}

const closeModal = () => {
    store.REMOVE_MODAL()
}
</script>

<template>
    <Modal modalClass="modal-delete-user">
        <template #modal>
            <div class="modal-header">
                <h2 class="sub-title fw-700 mb-0">Delete User:</h2>
            </div> 
             <div class="modal-body">
                <div class="row">
                    <p class="mb-1">Are you sure you want to delete {{ user.firstName }}'s user?</p>
                </div>
             </div>
             <div class="modal-footer">
                <div class="d-flex gap-1">
                    <button @click="deleteUser" class="btn btn-primary w-100 text-center">Delete</button>
                    <button @click="closeModal" class="btn btn-defualt w-100 text-center">Cancel</button>
                </div>
             </div>
        </template>
    </Modal>   
</template>

<style lang="scss" scoped>
.btn{
    // width: 100%;
    height: 40px;
    padding-inline: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
}

</style>