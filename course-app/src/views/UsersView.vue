<script setup>
import {markRaw} from 'vue';
import { useStore } from '@/stores/index.js';

import Wrapper from '@/components/shared/Wrapper.vue';
import Users from '@/components/pages/users/Users.vue';
import AddUserModal from '@/components/pages/users/AddUserModal.vue';

const store = useStore()

const addUserModal = () => {
    console.log('addUserModal clicked')

    store.ADD_MODAL({ 
        component: markRaw(AddUserModal), 
    })
}
</script>

<template>
    <Wrapper wrapperClass="users">
        <template #main>

            <section>

                <div class="container mx-auto pt-6 pb-4">
                    
                    <div class="row">
                        <div class="col-12 d-flex align-items-center justify-between mb-2">
                            <h2 class="sub-title fw-700">Users list:</h2>
                            <button class="btn btn-primary fw-16 fw-bold" @click="addUserModal">Add User</button>
                        </div>
                    </div>

                    <Users />

                </div>

            </section>


        </template>
    </Wrapper>
</template>
