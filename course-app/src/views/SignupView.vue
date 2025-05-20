<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/stores/index.js';

const router = useRouter()
const store = useStore()
const users = computed(() => { return store.users })


const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const error = ref({ active: false, message: ''})
const duplicateUser = ref(false)

const onSubmit = () => {
    const data = {
        id: Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
        type: 'user',
    }

    
    store.users.map(user => {
        user.email === data.email ? duplicateUser.value = true : duplicateUser.value = false
    })

    if( firstName.value && lastName.value && email.value && password.value ){
        if(!duplicateUser.value) {
            store.addUser(data)
    
            store.SET_AUTHENTICATION({active: true, type: 'user', user: data})
            router.push('/')
        } else {
            errorValidation()
        }
    } else {
        errorValidation()
    }

    console.log(data)
}

const errorValidation = () => {
    error.value.active = true
    error.value.message = duplicateUser.value ? 'This address is already used' : 'The email or password you entered is incorrect'
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
                                </div>
                                <div class="form-control">
                                    <label>Last Name</label>
                                    <input 
                                        type="text"
                                        id="lastName"
                                        placeholder="Last Name"
                                        v-model="lastName"
                                    />
                                </div>
                                <div class="form-control">
                                    <label>Email</label>
                                    <input 
                                        type="email"
                                        id="email"
                                        placeholder="Email"
                                        v-model="email"
                                    />
                                </div>
                                <div class="form-control">
                                    <label>Password</label>
                                    <input 
                                        type="text"
                                        id="password"
                                        placeholder="Password"
                                        v-model="password"
                                    />
                                    <span v-if="error.active" class="error-output">{{ error.message }}</span>
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
    color: #212529;
    background-color: #f2f4f7;
    
    
    .form{
        width: min(320px, 420px);
        background-color: #fff;
        
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