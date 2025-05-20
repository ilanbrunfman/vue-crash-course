<script setup>
import { ref, computed, } from 'vue';
import { useRouter } from 'vue-router'
import { useStore } from '@/stores/index.js'
import IconSignout from '@/components/icons/IconSignout.vue'

const store = useStore()
const router = useRouter()

const logOut = () => {
    store.SET_AUTHENTICATION({active: false, type: 'deualt'})
    router.push('/login')
}
const user = store.getUser.user

const links = ref([
    { to: '/', title: 'Jobs', rule: ['admin', 'user'], },
    { to: '/users', title: 'Users', rule: ['admin'], },
])

const filteredLinks = computed(() => {
    return links.value.filter(link => link.rule.includes(user.type))
})

const dropdown = ref(false)

const toggleDropdown = () => {
    dropdown.value = !dropdown.value
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
                    {{ user.firstName }} {{ user.lastName }}
                </button>
                

                <transition name="dropdown-animation" mode="out-in">
                    <div v-if="dropdown" class="dropdown">
                        <div class="row">
                            <div class="item">
                                <span></span>
                                <p class="item-test">
                                    {{ user.firstName }} {{ user.lastName }}
                                </p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="item item-link item-signout" @click="logOut()">
                                <IconSignout />
                                <label>Sign out</label>
                            </div>
                        </div>
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
    background-color: #512DA8;
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
        color: #fff;
        text-transform: uppercase;
    }
    .menu{
        display: flex;
        gap: 20px;
        align-items: center;

        .link{
            color: #fff;
            font-size: 16px;
            font-weight: 500;
            text-decoration: none;
        }
    }

    .user{
        text-decoration: underline;
        cursor: pointer;
    }

    .dropdown{
        position: absolute;
        top: 24px;
        right: 0px;
        width: 200px;
        border-radius: 6px;
        background-color: #fafbfc;
        overflow: hidden;
        box-shadow: 0 .5rem 1rem #00000026,inset 0 -1px #ffffff26;

        .item{
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 6px 14px 6px 8px;
            font-size: 14px;
            font-weight: 400;
            color: var(--black);

            &-link{
                cursor: pointer;
                & label{ cursor: pointer; }

                &:hover{ background-color: #eee; }
            }

            &-signout{
                svg{
                    width: 20px;
                    height: 20px;
                    fill: var(--black);
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