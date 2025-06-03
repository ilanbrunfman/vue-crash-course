<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { useStore } from '@/stores/index.js'
import IconUser from '@/components/icons/IconUser.vue'
import IconSignout from '@/components/icons/IconSignout.vue'

const store = useStore()
const router = useRouter()

const logOut = () => {
    store.SET_AUTHENTICATION({active: false, type: 'deualt'})
    router.push('/login')
}
const user = ref({})
// user.value = store.users.find((user) => user.id === store.getUser.user.id)

onMounted(() => {
    user.value = store.users.find((user) => user.id === store.getUser.user.id)
})
// const user = computed(() => {
//     return store.users.find(( user ) => user.id === store.getUser.user.id)
// } )

const links = ref([
    { to: '/', title: 'Jobs', rule: ['admin', 'user'], },
    { to: '/users', title: 'Users', rule: ['admin'], },
])

const filteredLinks = computed(() => {
    return links.value.filter(link => link.rule.includes(store.getUser.type))
})

const dropdown = ref(false)

const toggleDropdown = () => {
    setTimeout(() => {
        dropdown.value = !dropdown.value
    }, 10)
}

window.onclick = function(event) {
    if(dropdown.value && !event.target.matches('.dropbtn')){
        dropdown.value = !dropdown.value
    }
}


</script>

<template>
    <nav class="navbar">
        <div class="navbar-container container">
            <div class=" d-flex gap-2">
                <h3 class="logo">Vue Jobs</h3>
                <div class="menu">
                    <router-link 
                        v-for="(link, index) in filteredLinks" 
                        :key="index" 
                        :to="link.to"
                        :class="['link']"
                    >{{ link.title }}</router-link>
                </div>
            </div>
            <div class="d-flex gap-2 align-items-center position-relative">
                <button class="user fw-500 clr-white text-underline dropbtn" @click="toggleDropdown">
                    <!-- {{ user.firstName }} {{ user.lastName }} -->
                    <IconUser />
                </button>
                

                <transition name="dropdown-animation" mode="out-in">
                    <div v-if="dropdown" class="dropdown">
                        <div class="item item-link item-signout" @click="logOut()">
                            <IconSignout />
                            <label>Sign out</label>
                        </div>
                        <router-link :to="`${store.getUser.user.username}`" class="item item-link item-signout" >
                            <IconUser />
                            <label class="text-capitalize">{{store.getUser.user.firstName}} {{ store.getUser.user.lastName }}</label>
                        </router-link>
                    </div>
                </transition>
            </div>
            
        </div>
    </nav>
    
</template>

<style lang="scss" scoped>
.navbar{
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 64px;
    background-color: var(--background);
    // background-color: #512DA8;
    // border-bottom: solid 1px var(--vt-c-s-soft); // #213547;

    // box-shadow: 0 .5rem 1rem #00000026,inset 0 -1px #ffffff26;

    &-container{
        min-height: 64px;
        margin-inline: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .logo{
        font-weight: 700;
        color: var(--color-text);
        text-transform: uppercase;
    }
    .menu{
        display: flex;
        gap: 20px;
        align-items: center;

        .link{
            color: var(--color-text);
            font-size: 16px;
            font-weight: 500;
            text-decoration: none;
        }
    }

    .user{
        text-decoration: underline;
        cursor: pointer;

        display: flex;
        align-items: center;
        justify-content: center;

        width: 40px;
        height: 40px;
        background-color: rgba(var(--darkRGB), 0.075);
        border-radius: 100%;

        svg{
            width: 24px;
            height: 24px;
            fill: var(--color-text);
        }
    }

    .dropdown{
        position: absolute;
        top: 44px;
        right: 0px;
        width: 200px;
        border-radius: 6px;
        background-color: var(--background);
        overflow: hidden;
        box-shadow:  0 .5rem 1rem #00000026, inset 0 -1px #00000026;

        .item{
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px 14px 10px 10px;
            font-size: 14px;
            font-weight: 400;
            color: var(--color-text);

            &-link{
                cursor: pointer;
                & label{ cursor: pointer; }

                &:hover{ background-color: var(--soft-background); }
            }

            &-signout{
                svg{
                    width: 20px;
                    height: 20px;
                    fill: var(--color-text);
                }
            }

        }
    }
}

// dropdown-animation Slide up from bottom
.dropdown-animation-enter-active,
.dropdown-animation-leave-active {
    transition: 
        transform 0.5s ease-out,
        opacity 0.25s ease-out;
}

.dropdown-animation-enter,
.dropdown-animation-enter-active {
    transform: translateY(0px);
}

.dropdown-animation-enter-to {
    transform: translateY(0);
    transition: 
        transform 0.5s ease-out,
        opacity 0.25s ease-out;
}

.dropdown-animation-leave-to {
    transform: translateY(6px);
    opacity: 0;
}
</style>