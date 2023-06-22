<template>
  <div>
    <div class="flex flex-wrap gap-4 justify-center">
      <div  class="mt-5 max-w-sm pb-8 rounded overflow-hidden shadow-lg" v-for="post in posts" :key="post.id">
        <PostItem :post="post" @favoriteUpdated="toggleFavorite(postId)" />
      </div>
    </div>
  </div>
</template>

<script>
import API from "../api";
import PostItem from "../components/PostItem.vue";

export default {
  components: {
    PostItem,
  },
  data() {
    return {
      posts: [],
    };
  },
  async mounted() {
    this.posts = await API.getAllPost();

  },
  methods: {
    toggleFavorite(postId) {
      const index = this.posts.findIndex((item) => item._id === postId);
      if (index !== -1) {
        this.posts[index].favorite = !this.posts[index].favorite; 
      }

      
      localStorage.setItem('posts', JSON.stringify(this.posts));

      
      const favorites = this.posts
        .filter(post => post.favorite)
        .map(post => post._id);
      localStorage.setItem('favorites', JSON.stringify(favorites));

      this.$emit('toggle-favorite', favorites.length);
    },
  },
};
</script>

<style scoped>
</style>
