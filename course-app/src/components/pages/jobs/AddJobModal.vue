<script setup>
import { ref } from 'vue';
import { useStore } from '@/stores/index.js';
import { useRoute } from 'vue-router';

import Modal from '@/components/shared/Modal.vue';

const store = useStore()
const route = useRoute()
// const user =  store.users.find((user) => user.username === route.params.username) 
const user = store.getUser.user

const title = ref('')
const description = ref('')
const error = ref({ 
    active: false, 
    field: {
        title: '',
        description: ''
    },
})

const onSubmit = () => {
    const data = {
        id: Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
        userId: user.id,
        title: title.value,
        description: description.value,
    }

    if( title.value && description.value ){
        console.log('onSubmit', data)
        store.addJob(data)
        store.setToast({type: 'success', title: 'Success!', message: `Added job successfully`})
        store.REMOVE_MODAL()
    } else {
        errorValidation()
    }

}

const errorValidation = () => {
    error.value.active = true

    // email
    if ( !title.value ) {
        error.value.field.title = 'Please enter title'
    } else {
        error.value.field.title = ''
    }

    // description
    if ( !description.value ) {
        error.value.field.description = 'Please enter description'
    } else {
        error.value.field.description = ''
    }

    setTimeout(() => {error.value.active = false}, 3000);
}

</script>

<template>
    <Modal modalClass="modal-add-job">
        <template #modal>
            <div class="modal-header">
                <h2 class="sub-title fw-700 text-center mb-0">New post form:</h2>
            </div>
            <form @submit.prevent="handleSubmit" class="form">
                <div class="modal-body">
                    <div class="form-container">
                        <div class="form-control">
                            <label>Title:</label>
                            <input 
                                type="text"
                                id="title"
                                placeholder="Job title"
                                v-model="title"
                            />
                            <span v-if="error.active && error.field.title" class="error-output">{{ error.field.title }}</span>
                        </div>

                        <div class="form-control">
                            <label>Description:</label>
                            <textarea
                                id="description"
                                v-model="description"
                                name="description"
                                class=""
                                rows="4"
                                placeholder="Add any job duties, expectations, requirements, etc"
                            ></textarea>
                            <span v-if="error.active && error.field.description" class="error-output">{{ error.field.description }}</span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="form-control d-flex justify-start">
                        <button @click="onSubmit" type="submit" class="btn btn-primary w-100">Add Job</button>
                    </div>
                </div>
            </form>
        </template>
    </Modal>
</template>
