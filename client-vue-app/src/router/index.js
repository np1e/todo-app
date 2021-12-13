import TodoList from '/src/components/TodoList.vue';
import { createRouter, createWebHashHistory } from 'vue-router';

const Login = { template: '<div>Login</div>' };

const routes = [
    { path: '/', component: TodoList, meta: { requiresAuth: false } },
    { path: '/login', component: Login, meta: { requiresAuth: false } },
    { path: '/settings', component: Login, meta: { requiresAuth: false } },
    { path: '/login', component: Login, meta: { requiresAuth: false } },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from) => {
    if (to.meta.requiresAuth) {
        console.log("User needs to be logged in");
        return {
            path: '/login',
            query: { redirect: to.fullPath }
        }
    }
});

export default router;