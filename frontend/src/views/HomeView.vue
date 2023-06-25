<template>
  <div>
    <div v-if="posts.length > 0" class="flex flex-wrap gap-4 justify-center">
      <div class="mt-5 max-w-sm pb-8 rounded overflow-hidden shadow-lg" v-for="post in posts" :key="post.id">
          <PostItem :post="post" @favoriteUpdated="toggleFavorite(postId)" />
      </div>
    </div>
    <div v-else>

      <div class="flex items-center justify-center text-center mb-8">
        <div>
          <h1 class="text-4xl">Loading</h1> 
        </div>
        
          <div class="bouncing-loader mt-4">
              <div></div>
              <div></div>
              <div></div>
          </div>
    
          <br />

      </div>


      <p class="text-center">Der Webdienst hat möglicherweise ein Problem beim Aufrufen der Daten von der API. 
      Dies könnte einige Zeit dauern</p>
      
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
@keyframes bouncing-loader {
  to {
    opacity: 0.1;
    transform: translate3d(0, -16px, 0);
  }
}

.bouncing-loader {
  display: flex;
  justify-content: center;
}

.bouncing-loader > div {
  width: 16px;
  height: 16px;
  margin: 3rem 0.2rem;
  background: #000000;
  border-radius: 50%;
  animation: bouncing-loader 0.6s infinite alternate;
}

.bouncing-loader > div:nth-child(2) {
  animation-delay: 0.2s;
}

.bouncing-loader > div:nth-child(3) {
  animation-delay: 0.4s;
}
</style>
