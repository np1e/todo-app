<script>
import { signOut, onAuthStateChanged } from "firebase/auth";

export default {
    name: "Navigation",
    inject: ['auth'],
    data() {
        return {
            currentUser: this.auth.currentUser
        }
    },
    created() {
        onAuthStateChanged(this.auth, (user) => {
            this.currentUser = user;
        });
    },
    methods: {
        logout() {
            signOut(this.auth).then(() => {
                console.log("User signed out");
                this.$router.push({ name: 'login' });
            }).catch(error => {
                console.log(error);
            });
        }
    }
}
</script>

<template>
    <header class="flex justify-between space-x-4 py-3 bg-red-500 px-8 text-gray-100">
        <nav class="nav__main flex space-x-4">
            <router-link to="/">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            </router-link>
        </nav>
        <nav class="nav__meta flex space-x-4">
            <router-link to="/settings">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </router-link>
            <a href="/notifications">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
            </a>
            <button v-if="currentUser" @click="logout">
                <svg class="w-6 h-6 hover:opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
            </button>
        </nav>
    </header>
</template>