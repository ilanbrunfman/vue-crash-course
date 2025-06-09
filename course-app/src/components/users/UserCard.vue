<script setup>
import { ref, computed } from 'vue';
import { useStore } from '@/stores/index.js'
import IconUser from '@/components/icons/IconUser.vue';
import IconTrash from '@/components/icons/IconTrash.vue';
const props = defineProps({
    user: { type: Object, required: true},
})

const store = useStore()

const jobsOfUserId =  ref([])


const type = computed(() => {
    switch (props.user.type) {
        case 'admin': 
            return 'card-admin'
        case 'user': 
            return 'card-user'
        default:
            return 'card-default'
    }
})

const deleteUser = (user) => {
    if(user.type !== 'admin'){
        store.deleteUser(user)
    } else {
        setTimeout(() => { store.setToast({ type: 'error', title: ``, message: 'Cannot delete Admin account' }) }, 100);
    }
}
</script>

<template>
    <div :class="['card', type]">
        <router-link :to="`/${user.username}`" class="card-body">
            <div class="d-flex align-items-center gap-1 gap-md-2">
                <div class="user-icon">
                    <IconUser />
                </div>
                <div class="">
                    <div class="bubble">
                        <span class="user-type">{{ user.type }}</span>
                    </div>
                    <h3 class="user-title">{{ user.firstName }} {{ user.lastName }}</h3>
                </div>
            </div>
        </router-link>
        <div class="card-actions">
            <button class="delete-icon" @click="deleteUser(user)">
                <IconTrash />
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/partials/variables" as var;
.card{
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 48px;
    background-color: var(--background);
    padding: 10px;
    border-bottom: solid 1px rgba(#6a6a6a, 0.075);

        @media (min-width: var.$md) {
            padding: 20px;
        }

    &:first-child{
        border-bottom: none;
    }

    &:hover{
        background-color: rgba(#5d5d5d, 0.075);
        // border-bottom: none;
    }

    &-body{
        .bubble{
            display: inline-block;
            padding: 0px 12px;
            // background-color: #eee;
            border-radius: 16px;
            margin-bottom: 6px;

            @media (min-width: var.$md) {
                margin-bottom: 10px;
            }

            .user-type{
                display: flex;
                align-items: center;
                min-height: 20px;
                font-size: 10px;
                font-weight: bold;
                text-transform: uppercase;
                line-height: 1.0;
                padding-top: 2px;
            }
        }

        .user-icon{
            width: 40px;
            height: 38px;
            display: flex;
            align-items: center;
            justify-content: center;
            // background-color: #eee;

            background-color: var(--soft-background);
            border-radius: 100%;

            svg{
                width: 20px;
                height: 20px;
                fill: var(--color-text);
                
                @media (min-width: var.$md) {
                    width: 24px;
                    height: 24px;
                }
            }

        }

        .user-title{
            display: block;
            font-size: 14px;
            font-weight: bold;
            text-decoration: none;
            color: var(--color-text);
            text-transform: capitalize;

            @media (min-width: var.$md) {
                font-size: 16px;
            }
        }
    }
    
    &-actions{
        .delete-icon{
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 100%;
            cursor: pointer;

            &:active{
                svg{
                    fill: #F44336;
                }
                // background-color: var(--soft-background);
            }

            svg{
                width: 20px;
                height: 20px;
                fill: var(--color-text);

                @media (min-width: var.$md) {
                    width: 24px;
                    height: 24px;
                }
            }

        }
    }

    &-admin{
        .bubble{
            background-color: #10ac84;
            color: #fff;
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