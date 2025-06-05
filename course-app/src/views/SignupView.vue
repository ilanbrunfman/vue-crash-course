<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/stores/index.js';

const router = useRouter()
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
        following: [],
    }

    duplicate.value = store.users.filter(user => user.email === email.value)
    

    if( firstName.value && lastName.value && email.value && duplicate.value.length == 0 && password.value && !error.value.active ){
        store.addUser(data)

        store.SET_AUTHENTICATION({active: true, type: 'user', user: data})
        router.push('/')
    } else {
        errorValidation()
    }

    console.log(data)
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

</script>

<template>
    <section>
        <div class="row">
            <transition name="fade" appear>
                <div class="form">
                    <div class="form-container mb-0-5">
                        <div class="form-header">
                             <h3 class="sub-title">Signup</h3>
                        </div>
                        <div class="form-body">
                            <form @submit.prevent="handleSubmit">
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
                                <div class="form-control">
                                    <button @click="onSubmit" type="submit" class="btn btn-primary">Sign In</button>
                                </div>

                            </form>
                        </div>
                    </div>
                    <div class="row">
                        <span class="fs-13 fw-400">Already have an account? <RouterLink class="clr-blue-500" to="/login">Log in</RouterLink></span>
                    </div>
                </div>
            </transition>
        </div>
    </section>
</template>

<style lang="scss" scoped>
section{
    width: 100%;
    height: 100vh;
    display: grid;
    place-items: center;
    // color: #212529;
    // background-color: #f2f4f7;
    background-color: var(--light);
    
    
    .form{
        width: min(320px, 420px);
         background-color: var(--background);
        
        padding: 20px;
        border: solid 1px rgba(#5d5d5d, 0.125);
        border-radius: 4px;

        &-header{
            .sub-title {
                font-size: clamp(14px, -0.875rem + 8.333vw, 20px);
                font-weight: bold;
                line-height: 1.0;
                margin-bottom: 14px;
                text-align: center;
            }
        }
        &-body{
            .error-output{
                position: relative;
                top: 4px;
                font-size: 12px;
                color: #D32F2F;
            }
        }
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
                // border: solid 1px rgba(#000, 0.125);
                border-radius: 4px;
                outline: none;
                border: solid 1px rgba(var(--darkRGB), 0.125);
                background-color: inherit;
                color: var(--dark);

            }

            .btn{
                width: 100%;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                font-size: 14px;
                font-weight: bold;
                color: #fff;
                background-color: rgba(#0070d9, 1.0);
                border-radius: 4px;
                cursor: pointer;

                &:hover{
                    background-color: rgba(#0070d9, 0.8);
                }
            }
        }   
    }
}
</style>