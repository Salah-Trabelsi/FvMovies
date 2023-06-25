<template>
    <div class="container mx-auto px-2">
        <div class="rounded overflow-hidden shadow-lg">
        <img class="w-full" :src="post.image" :alt="post.title">
        <div class="flex items-center justify-between px-6 pt-4 pb-2">
            <div>
                <span class="inline-block bg-gray-200 rounded-full px-4 py-2 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {{ post.category }}
                </span>
            </div>
            <div class="flex-nowrap">
                <router-link :to="{name: 'edit-post', params: {id: post._id}}" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                    bearbeiten
                </router-link>
                <button @click="removePost(post._id)" class="mr-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                    löschen
                </button>
            </div>

        </div>
        <div class="px-6 py-4">
            <div class="font-bold text-2xl mb-4">{{ post.title }}</div>
            <p class="text-gray-700 text-base">
                {{ post.content }} <br><br>
          
            </p>
        </div>
        </div>
    </div>
</template>

<script>
import API from "../api"
    export default {
        
        data() {
            return {
                post: {},
            }
        },

        async created() {
            const postId = this.$route.params.id; 
            this.post = await API.getPostById(postId);
        },
        methods: {
            async removePost(id) {
                const response = await API.deletePost(id);
                this.$router.push({name: 'home', params: {message: response.message}})
            }
        }

    }
</script>

<style scoped>

</style>