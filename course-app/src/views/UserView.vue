<script setup>
import { ref, markRaw, onMounted, onBeforeUnmount, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '@/stores/index.js'

import Wrapper from '@/components/shared/Wrapper.vue';
import EditUserModal from '@/components/pages/users/EditUserModal.vue';
import DeleteUserModal from '@/components/pages/users/DeleteUserModal.vue';
import EditJobModal from '@/components/pages/jobs/EditJobModal.vue';
import IconHorizontalDots from '@/components/icons/IconHorizontalDots.vue';
import IconNotePencil from '@/components/icons/IconNotePencil.vue';
import IconTrash from '@/components/icons/IconTrash.vue';

const route = useRoute()
const store = useStore()

const user = ref( store.users.find((user) => user.username === route.params.username) )
const currentUser = computed(() => {
    return store.users.find((user) => user.username === route.params.username)
})

const jobs = ref([])
const activeJobId = ref(null)
jobs.value = computed(() => { 
    return store.jobs
        .filter((job) => job.userId === user.value.id)
        .map((job) => {
            return {
                ...job,
                active: job.id === activeJobId.value, // if statement, then true or false
            }
        }) 
})

const editUserModal = () => {
    store.ADD_MODAL({ component: markRaw(EditUserModal), })
}

const deleteUser = () => {
    if(currentUser.value.type !== 'admin'){
        store.ADD_MODAL({ component: markRaw(DeleteUserModal), data: currentUser.value})
    } else {
        setTimeout(() => { store.setToast({ type: 'error', title: ``, message: 'Cannot delete Admin account' }) }, 100);
    }
}

// Dropdown items
const jobDropdownItems = ref([
    { title: 'Update', icon: markRaw(IconNotePencil), cta: updateJobModal, rule: user.value.id === store.getUser.user.id },
    { title: 'Delete', icon: markRaw(IconTrash), cta: deleteJob, rule: true },
])

const toggleDropdown = (job) => {
    activeJobId.value = activeJobId.value === job.id ? null : job.id;
}

function handleClickOutside(event) {
  // If click target is NOT inside a dropdown
  const clickedInsideDropdown = event.target.closest('[data-dropdown-test]') || event.target.closest('[data-dropdown-id]');
  if (!clickedInsideDropdown) {
    activeJobId.value = null;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
}); 

function updateJobModal(job)  {
    store.ADD_MODAL({ component: markRaw(EditJobModal), data: job})
}

function deleteJob(job) {
    store.deleteJob(job)
}

// followers
const followers = ref([])
const number = ref(0)
onMounted( async () => {
    await store.fetchUsers() // make sure this completes
    const currentUser = ref( store.users.find((user) => user.username === route.params.username) )

    followers.value = store.users
        .filter(item => 
            item.email !== currentUser.value.email && // don't include self
            currentUser.value.following.includes(item.email) // exclude already followed)
        )
        .map(follower => ({
            ...follower,
            isdFollow: true // local follow flag
        })) 
    
    number.value = followers.value.length
}) 


</script>

<template>
     <Wrapper wrapperClass="user-profile">
        <template #main>
            <div class="container mx-auto pt-6">
                <div class="row d-grid gap-2 grid-1 grid-md-5-7">
                    
                    <div class="col">
                        <div class="row">
                            <div class="card">
                                <div class="card-header">
                                    <h2 class="sub-title fw-700 text-capitalize">Intro</h2>
                                </div>
                                <div class="card-body">
                                    <div v-if="user" :class="['profile', `profile-${currentUser.type}`]">
                                        <div class="row mb-1">
                                            <div class="d-flex align-items-center ">
                                                    <label>First name:</label>
                                                <p class="">{{ currentUser.firstName }}</p>
                                            </div>
                                        </div>
                                        <div class="row mb-1">
                                            <div class="d-flex align-items-center ">
                                                    <label>Last name:</label>
                                                <p class="">{{ currentUser.lastName }}</p>
                                            </div>
                                        </div>
                                        <template v-if="store.getUser.user.type === 'admin'">
    
                                            <div class="row mb-1">
                                                <div class="d-flex align-items-center ">
                                                    <label>Type:</label>
                                                    <div :class="['bubble', `bubble-${currentUser.type}`]">
                                                        <p class="profile-type">{{ currentUser.type }}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row mb-1">
                                                <div class="d-flex align-items-center ">
                                                        <label>Email:</label>
                                                    <p class="">{{ currentUser.email }}</p>
                                                </div>
                                            </div>
                                            <div class="row mb-1 pb-0-5">
                                                <div class="d-flex align-items-center ">
                                                    <label>Passowrd:</label>
                                                    <p class="">
                                                        <span class="" v-for="(item, i) in currentUser.password.length" :key="i" >&bull;</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="row d-flex gap-1">
                                                <button class="btn btn-primary fw-bold fs-14" @click="editUserModal">Edit Profile</button>
                                                <button class="btn btn-defualt fw-bold fs-14" @click="deleteUser">Delete User</button>
                                            </div>
                                        </template>
    
                                    </div>
                                    <p v-else>Profile is loading..</p>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="card">
                                <div class="card-header">
                                    <h2 class="sub-title fw-700 text-capitalize mb-0-5">Friends</h2>
                                    <p class="fs-14 fw-500 clr-copy">
                                        <span>{{ number }}</span> <span v-html="number > 1 ? 'friends' : number < 1 ? 'friends' : 'friend'"></span>
                                    </p>
                                </div>
                                <div class="card-body">
                                    <template v-if="followers.length > 0">
                                        <div v-for="(follower, index) in followers" :key="index" class="card-follower d-flex align-items-center justify-between">
                                            <h4 class="fw-600">{{ follower.firstName }} {{ follower.lastName }}</h4>
                                        </div>
                                    </template>
                                    <p v-else>List is empty..</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col">
                        <div class="row d-flex align-items-center justify-between mb-2">
                            <h2 class="sub-title fw-700 pt-1">Job list by {{ currentUser.firstName  }}:</h2>
                            <button v-if="store.getUser.user.id === user.id" class="btn btn-primary fw-16 fw-bold" @click="addJobModal">Add job</button>
                        </div>

                        <div class="row">
                            <template v-if="jobs.value.length > 0 ">
                                <div v-for="(job,index) in jobs.value" :key="index" class="card" >
                                    <div class="card-header d-flex justify-between align-items-start">
                                        <div class="col">
                                            <p class="fs-16 fw-700 mb-0-5">{{ job.title }}</p>
                                            <p class="fs-14 fw-400 mb-0">{{ job.description }}</p>
                                        </div>
                                        <button v-if="store.getUser.user.type === 'admin'" class="btn-horizontal-dots dropbtn" @click="toggleDropdown(job)" :data-dropdown-id="job.id">
                                            <IconHorizontalDots />
                                        </button>
                                        <div  v-if="activeJobId === job.id" data-dropdown  class="dropdown-items">
                                            <template v-for="(item, index) in jobDropdownItems" >
                                                <button v-if="item.rule" :key="index"  class="item item-btn" @click="item.cta(job)">
                                                    <component :is="item.icon" />
                                                    <label>{{ item.title }}</label>
                                                </button>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template v-else>
                                <p>Job list is empty!</p>
                            </template>
                        </div>
                    </div>

                </div>
            </div>
        </template>
    </Wrapper>   
</template>

<style lang="scss" scoped>
.card{
    background-color: var(--background);
    // padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;

    &-header{
        position: relative;
        padding: 20px;  

        .btn-horizontal-dots{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            border-radius: 100%;
            background-color: var(--soft-background);
            cursor: pointer;

            svg{
                width: 28px;
                height: 28px;
                fill: var(--color-text);
            }
        }

        .dropdown-items{
            position: absolute;
            z-index: 1;
            top: 60px;
            right: 35px;
            width: min(120px, 100%);
            border-radius: 6px;
            background-color: var(--background);
            overflow: hidden;
            box-shadow:  0 .5rem 1rem #00000026, inset 0 -1px #00000026;

            .item{
                display: flex;
                align-items: center;
                gap: 10px;
                width: 100%;
                padding: 10px 14px 10px 10px;
                font-size: 14px;
                font-weight: 400;
                color: var(--color-text);

                &-btn{
                    cursor: pointer;
                    & label{ cursor: pointer; }

                    &:hover{ background-color: var(--soft-background); }
                }

                svg{
                    width: 18px;
                    height: 18px;
                    fill: var(--color-text);
                }
            }
        }
    }
    &-body{
        padding: 20px;
        padding-top: 0px;
    }
    &-follower{
        margin-bottom: 1.0rem;

        &:last-child{ margin-bottom: 0; }
    }
}
.profile{

    label{
        margin-right: 5px;
        font-weight: 700;
    }
    &-title{
        text-transform: capitalize;
        span{
            font-weight: 400;
            
        }
    }

    .bubble{
        display: inline-block;
        padding: 0px 12px;
        background-color: #feca57;
        // color: #212529;
        border-radius: 16px;
        // margin-bottom: 6px;

        // @media (min-width: var.$md) {
        //     margin-bottom: 10px;
        // }

        &-admin{
            background-color: #10ac84;
            color: #fff;
        }

        .profile-type{
            display: flex;
            align-items: center;
            min-height: 20px;
            font-size: 10px;
            font-weight: bold;
            text-transform: uppercase;
            line-height: 1.0;
            padding-top: 0px;
        }
    }

    &-user{
        .bubble{
            background-color: #feca57;
            color: #212529;
        }
    }
}
</style>