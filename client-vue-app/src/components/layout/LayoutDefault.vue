<script>
import Navigation from './Navigation.vue';
export default {
    name: "DefaultLayout",
    components: {
      'navigation': Navigation
    }
}
</script>

<template>
<div class="LayoutDefault flex flex-col h-screen">
  <navigation/>
  <main class="container flex-grow">
    <slot/>
  </main>
  <footer class="flex justify-center py-4">
    <p>Made by Nick</p>
  </footer>
</div>
</template>

<style scoped lang="scss">
  footer {
    
  }
</style>