<template>
    <router-link :to="{ name: 'post', params: { id: post._id } }">
        <img class="w-full" :src="post.image" :alt="post.title">
    </router-link>
    <div class="px-6 pt-4 pb-2 flex justify-between">
        <div class="">
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {{ post.category }}
            </span>
        </div>
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" 
            @click="toggleFavorite(post)"
                :class="{ 'text-red-500': post.favorite }">
                <path class="red-500" fill="currentColor" fill-rule="evenodd"
                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15C-7.534 4.736 3.562-3.248 8 1.314z" />
            </svg>
        </div>
    </div>
    <div class="px-6 py-3">
        <div class="font-bold text-xl mb-2">{{ post.title }}</div>
        <p class="text-gray-700 text-base">
            {{ post.content.substring(0, 100) + "..." }}
        </p>
    </div>
</template>

<script>
export default {
    name: 'PostItem',

    props: {
            post: {
            type: Object,
            required: true,
            },
          
        },
        emits: ['favoriteUpdated'],
        methods: {
            toggleFavorite() {
                this.post.favorite = !this.post.favorite;
                localStorage.setItem('post_' + this.post._id, this.post.favorite);
                this.$emit('favoriteUpdated', this.post);

            },
        },

        mounted() {
            const favoriteStatus = localStorage.getItem('post_' + this.post._id);
            if (favoriteStatus) {
            this.post.favorite = JSON.parse(favoriteStatus);
            }
        }
    }
</script>

<style scoped></style>