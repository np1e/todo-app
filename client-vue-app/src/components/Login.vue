<script>
import DefaultLayout from './layout/LayoutDefault.vue';
export default {
    name: "Login",
    created() {
        this.$emit("update:layout", DefaultLayout);
    }

}
</script>

<template>
Login
</template>