<script setup>
import { onMounted, ref } from 'vue';
import { useStore } from '@/stores/index.js'

const store = useStore()
const followers = ref([])

onMounted( async () => {
    await store.fetchUsers() // make sure this completes
    const currentUser = store.getUser.user

    followers.value = store.users
        .filter(user => 
            user.email !== currentUser.email && // don't include self
            !currentUser.following.includes(user.email) // exclude already followed)
        )
        .map(user => ({
            ...user,
            idFollow: false // local follow flag
        })) 
})  

const toggleFollow = (follower) => {
    follower.isFollow = !follower.isFollow

    if (follower.isFollow) {
        store.followUser(follower.email)
    } else {
        store.unfollowUser(follower.email)
    }
}

</script>

<template>
    <section>
        <div class="container mx-auto pt-6">

            <div class="row">
                <div class="cards col-12 col-md-8 mx-auto mb-2">

                    <div class="card">
                        <div class="card-header">
                            <h2 class="para fw-700 mb-1">People you may know</h2>
                        </div>
                        <div class="card-body d-flex gap-1 scroll-x">

                            <template v-if="followers.length > 0">
                                <div v-for="(user, index) in followers" :key="index" class="card-follower"  >
                                    <p class="fs-14 fw-600 lh-1-0 mb-1 text-center">{{  user.firstName }} {{ user.lastName }}</p>
                                    <button :class="['btn fw-700 justify-center', user.isFollow ? 'btn-defualt' :'btn-primary']" @click="toggleFollow(user)">
                                        {{ user.isFollow ? 'Unfollow' : 'Follow' }}
                                    </button>
                                </div>
                            </template>
                            <p v-else>List is empty</p>
                               



                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/partials/variables" as var;
.scroll-x{
    // padding-bottom: 20px;
    overflow-x: auto;
}
.cards{
    .card{
        background-color: var(--background);
        padding: 10px;
        border-radius: 10px;
        // margin-bottom: 10px;

        &.active{
            background-color:red;
        }

        @media (min-width: var.$md) {
            // padding: 12px 16px;
            padding: 20px;
            margin-bottom: 20px;
        }

        &-follower{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-width: 120px;
            position: relative;
            padding: 10px;
            border: solid 1px rgba(var(--darkRGB), 0.125);
            border-radius: 6px;
        }

        &-header{}
        &-body{}
        &-footer{}
    }
}
</style>