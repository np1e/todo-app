import TodoList from '/src/components/TodoList.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Login from '/src/components/auth/Login.vue';
import Registration from '/src/components/auth/Registration.vue';
import { getAuth } from "firebase/auth";

const routes = [
    { path: '/', name: 'dashboard', component: TodoList, meta: { requiresAuth: true } },
    { path: '/login', name: 'login', component: Login, meta: { requiresAuth: false } },
    { path: '/register', name: 'registration', component: Registration, meta: { requiresAuth: false } },
    { path: '/settings', name: 'settings', component: Login, meta: { requiresAuth: true } },
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from) => {
    const user = getAuth().currentUser;
    if (to.meta.requiresAuth) {
        console.log("User needs to be logged in");
        if(!user) {
            return {
                name: 'login',
                query: { redirect: to.fullPath }
            }
        }
        return true;
    }
});

export default router;