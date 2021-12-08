<script>
import DefaultLayout from './components/layout/LayoutDefault.vue';
export default {
  data() {
    return {
      layout: DefaultLayout
    }
  }
}
</script>


<template>
  <component :is="layout">
    <router-view :layout.sync="layout"/>
  </component>
</template>

<style>
</style>
