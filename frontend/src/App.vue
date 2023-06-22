<template>
  <main class="mt-3 mb-8">
    

    <SideBar ref="sideBar" />
    <div class="p-0 sm:p-0 md:p-4 lg:p-4 sm:ml-64">
      <router-view  />
    </div>
    <Footer />

  </main>
  
</template>

<script setup>
  import { useHead } from '@vueuse/head';
  import SideBar from '@/components/SideBar.vue';
  import Footer from '@/components/Footer.vue';


  useHead({

    title: "Superhelden-Filme",

  })


</script>

