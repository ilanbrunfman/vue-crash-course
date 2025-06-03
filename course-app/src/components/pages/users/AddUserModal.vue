<script setup>
import { ref } from 'vue';
import { useStore } from '@/stores/index.js';
import Modal from '@/components/shared/Modal.vue';
import IconX from '@/components/icons/IconX.vue';

const store = useStore()

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const error = ref({ 
    active: false, 
    field: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    },
})
const duplicate = ref([])

const onSubmit = () => {
    const data = {
        id: Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
        username: `${firstName.value.toLocaleLowerCase()}-${lastName.value.toLocaleLowerCase()}`,
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
        type: 'user',
    }

    duplicate.value = store.users.filter(user => user.email === email.value)

    if( firstName.value && lastName.value && email.value && duplicate.value.length == 0 && password.value && !error.value.active ) {
        store.addUser(data)
        store.REMOVE_MODAL()
    } else {
        errorValidation()
    }
}

const errorValidation = () => {
    error.value.active = true

    // firstName
    if( !firstName.value ) {
        error.value.field.firstName = 'Please enter first mame'
    } else {
        error.value.field.firstName = ''
    }

    // lastName
    if ( !lastName.value ) {
        error.value.field.lastName = 'Please enter last name'
    } else {
        error.value.field.lastName = ''
    }

    // email
    if ( !email.value ) {
        error.value.field.email = 'Please enter email address'
    } else if ( !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) ){
        error.value.field.email = 'Invalid email format.'
    } else if ( email.value && duplicate.value.length > 0 ) {
        error.value.field.email = 'This address is already used'
    } else {
        error.value.field.email = ''
    }

    // password
    if ( !password.value ) {
        error.value.field.password = 'Please enter password'
    } else {
        error.value.field.password = ''
    }

    setTimeout(() => {error.value.active = false}, 3000);
}

const closeModal = () => {
    store.REMOVE_MODAL()
}
</script>

<template>
    <Modal modalClass="modal-add-user">
        <template #modal>
            <div class="modal-header">
                <h2 class="sub-title fw-700 mb-0">New user form:</h2>
                <button class="btn-exit" @click="closeModal">
                    <IconX />
                </button>
            </div>
            <div class="modal-body">
                <form class="form" @submit.prevent="handleSubmit">
                    <div class="form-control">
                        <label>First Name</label>
                        <input 
                            type="text"
                            id="firstName"
                            placeholder="First Name"
                            v-model="firstName"
                        />
                        <span v-if="error.active && error.field.firstName" class="error-output">{{ error.field.firstName }}</span>
                    </div>
                    <div class="form-control">
                        <label>Last Name</label>
                        <input 
                            type="text"
                            id="lastName"
                            placeholder="Last Name"
                            v-model="lastName"
                        />
                        <span v-if="error.active && error.field.lastName" class="error-output">{{ error.field.lastName }}</span>
                    </div>
                    <div class="form-control">
                        <label>Email</label>
                        <input 
                            type="email"
                            id="email"
                            placeholder="Email"
                            v-model="email"
                        />
                        <span v-if="error.active && error.field.email" class="error-output">{{ error.field.email }}</span>
                    </div>
                    <div class="form-control">
                        <label>Password</label>
                        <input 
                            type="password"
                            id="password"
                            placeholder="Password"
                            v-model="password"
                        />
                        <span v-if="error.active && error.field.password" class="error-output">{{ error.field.password }}</span>
                    </div>
                    
                </form>
            </div>
            <div class="modal-footer">
                <div class="form-control d-flex justify-center gap-1 gap-md-1">
                    <button @click="closeModal" class="btn btn-defualt fs-16 fw-bold w-100">Cancel</button>
                    <button @click="onSubmit" type="submit" class="btn btn-primary fs-16 fw-bold w-100">Add User</button>
                </div>
            </div>
            
        </template>
    </Modal> 
</template>

<style lang="scss" scoped>
.form1{
    &-header{
        position: relative;
        .sub-title {
            font-size: clamp(14px, -0.875rem + 8.333vw, 20px);
            font-weight: bold;
            line-height: 1.0;
            margin-bottom: 14px;
            text-align: center;
        }
    }
    &-body{}
    &-control{
        position: relative;
        margin-bottom: 20px;

        &:last-child{
            margin-bottom: 0;
        }

        label{
            display: block;
            font-size: 13px;
            font-weight: 600;
            line-height: 1.0;
            margin-bottom: 6px;
            padding-left: 4px;
        }

        input{
            display: block;
            width: 100%;
            min-height: 32px;
            padding: 4px 8px;
            border: solid 1px rgba(#000, 0.125);
            border-radius: 4px;
            outline: none;

        }

        .error-output{
            position: relative;
            top: 4px;
            font-size: 12px;
            color: #D32F2F;
        }

        .btn{
            // width: 100%;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-size: 14px;
            font-weight: bold;
            color: #fff;
            // background-color: rgba(, 1.0);
            border-radius: 4px;
            cursor: pointer;

            &:hover{
                // background-color: rgba(#0070d9, 0.8);
            }
        }
    }   
}
</style>