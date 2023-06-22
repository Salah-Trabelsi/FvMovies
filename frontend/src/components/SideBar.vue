<template>
  <button
    data-drawer-target="default-sidebar"
    data-drawer-toggle="default-sidebar"
    aria-controls="default-sidebar"
    type="button"
    class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    @click="toggleSidebar"
  >
    <span class="sr-only">Open sidebar</span>
    <svg
      class="w-6 h-6"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clip-rule="evenodd"
        fill-rule="evenodd"
        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
      ></path>
    </svg>
  </button>

  <aside
    id="default-sidebar"
    ref="sideBar"
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
    aria-label="Sidebar"
    :class="{ 'translate-x-0': isSidebarOpen, '-translate-x-full': !isSidebarOpen }"
  >
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <h1 class="text-white text-3xl font-semibold mb-10">SuperHelden <br> Tracker </h1>
      <ul class="space-y-2 font-medium">
        <li>
          <router-link
            :to="{ name: 'home' }"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            @click="closeSidebar"
          >
            <svg
              aria-hidden="true"
              class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              ></path>
            </svg>
            <span class="flex-1 ml-3 whitespace-nowrap">Home</span>
          </router-link>
        </li>
        <li>
          <router-link
            :to="{ name: 'add-post' }"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            @click="closeSidebar"
          >
            <svg
              aria-hidden="true"
              class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h9v2H5v14h14v-9h2v9q0 .825-.588 1.413T19 21H5Zm3-4v-2h8v2H8Zm0-3v-2h8v2H8Zm0-3V9h8v2H8Zm9-2V7h-2V5h2V3h2v2h2v2h-2v2h-2Z"
              ></path>
            </svg>
            <span class="flex-1 ml-3 whitespace-nowrap">Superheldenfilm +</span>
          </router-link>
        </li>
        <li>
          <a href="https://heartfelt-centaur-537924.netlify.app/"
            target="_blank"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            
          >
          <svg class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M18 9h-2V7h2m0 6h-2v-2h2m0 6h-2v-2h2M8 9H6V7h2m0 6H6v-2h2m0 6H6v-2h2M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2Z"/>
          </svg>
            <span class="flex-1 ml-3 whitespace-nowrap">Mehr Movies</span>
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
export default {
    name: 'SideBar',
    emits: ['toggle-favorite'],
    data() {

      return {

        isSidebarOpen: false
      }
    },

    methods: {
        toggleSidebar() {
        this.isSidebarOpen = !this.isSidebarOpen;
      },
        closeSidebar() {
        this.isSidebarOpen = false;
      },

      handleClickOutside(event) {
        const sidebar = this.$refs.sideBar;
        const toggleButton = event.target.closest("[data-drawer-target='default-sidebar']");

        if (sidebar && !sidebar.contains(event.target) && !toggleButton) {
          this.isSidebarOpen = false;
        }
     }
    },

    mounted() {
      document.addEventListener('click', this.handleClickOutside);
    },
    beforeUnmount() {
      document.removeEventListener('click', this.handleClickOutside);
    },

 
};
</script>

<style scoped></style>
