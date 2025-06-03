<script setup>
import { ref, computed } from 'vue';
import { useStore } from '@/stores/index.js';
import { useRoute, useRouter } from 'vue-router';
import Modal from '@/components/shared/Modal.vue';

const store = useStore()
const route = useRoute()
const router = useRouter()

const user = computed(() => { return store.users.find((user) => user.username === route.params.username) })

const firstName = ref(user.value.firstName)
const lastName = ref(user.value.lastName)
const type = ref(`${user.value.type}`)
const email = ref(user.value.email)
const password = ref(user.value.password)

const error = ref({ 
    active: false, 
    field: {
        firstName: '',
        lastName: '',
        password: ''
    },
})

const onSubmit = () => {
    const data = {
        id: user.value.id,
        username: `${firstName.value.toLocaleLowerCase()}-${lastName.value.toLocaleLowerCase()}`,
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
        type: type.value,
    }

    if( firstName.value && lastName.value && password.value ){
        store.updateUser(data)
        store.setToast({type: 'success', title: 'Success!', message: `Updated user successfully`})
        router.push(`/${data.username}`)
        store.REMOVE_MODAL()
    } else {
        errorValidation()
    }

}

const errorValidation = () => {
    error.value.active = true

    // first name
    if ( !firstName.value ) {
        error.value.field.firstName = 'Please enter first name'
    } else {
        error.value.field.title = ''
    }

    // last name
    if ( !lastName.value ) {
        error.value.field.lastName = 'Please enter last name'
    } else {
        error.value.field.lastName = ''
    }
    
    // password
    if ( !lastName.value ) {
        error.value.field.password = 'Please enter password'
    } else {
        error.value.field.lastName = ''
    }

    setTimeout(() => {error.value.active = false}, 3000);
}


</script>

<template>
    <Modal modalClass="modal-edit-user">
        <template #modal>
            <div class="modal-header">
                <h2 class="sub-title fw-700 text-center mb-0">Edit user form:</h2>
            </div>
            <form @submit.prevent="handleSubmit" class="form">
                <div class="modal-body">
                    <div class="form-container">
                        <div class="form-control">
                            <label>First Name:</label>
                            <input 
                                type="text"
                                id="first-name"
                                v-model="firstName"
                            />
                            <span v-if="error.active && error.field.firstName" class="error-output">{{ error.field.firstName }}</span>
                        </div>
                        <div class="form-control">
                            <label>Last Name:</label>
                            <input 
                                type="text"
                                id="last-name"
                                v-model="lastName"
                            />
                            <span v-if="error.active && error.field.lastName" class="error-output">{{ error.field.lastName }}</span>
                        </div>
                        <div class="form-control">
                            <label>Type:</label>
                            <p v-if="store.getUser.user.type !== 'admin'" class="input select-none text-capitalize" style="display: flex; align-items: center; color: #a7abaf; ">{{ type }}</p>
                            <select
                                v-else
                                v-model="type"
                                id="type"
                                name="type"
                            >
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                        </div>
                        <div class="form-control">
                            <label>Email:</label>
                            <p class="input select-none" style="display: flex; align-items: center; color: #a7abaf; ">{{ email }}</p>
                        </div>
                        <div class="form-control">
                            <label>Password:</label>
                            <input 
                                type="text"
                                id="password"
                                v-model="password"
                            />
                            <span v-if="error.active && error.field.password" class="error-output">{{ error.field.password }}</span>
                        </div>
                    </div>
                </div>
                 <div class="modal-footer">
                    <div class="form-control d-flex justify-start">
                        <button @click="onSubmit" type="submit" class="btn btn-primary w-100">Update user</button>
                    </div>
                </div>
            </form>
        </template>
    </Modal>
</template>