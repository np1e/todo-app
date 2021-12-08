<script setup>
import TodoItem from './TodoItem.vue';
import DefaultLayout from './layout/LayoutDefault.vue';
import CreateTodo from './todo/CreateTodo.vue';
</script>

<script>
export default {
    name: 'TodoList',
    inject: ['api'],
    components: {
        'todo-item': TodoItem
    },
    data() {
        return {
            items: []
        }
    },
    props: {
    },
    methods: {
        addTodo(todo) {
            console.log(todo);
            this.items.push(todo);
        },
        removeTodo(item) {
            this.api.deleteTodo(item.id, res => {
                console.log(`Remove todo ${item.id}`);
                delete this.items.splice(this.items.indexOf(item), 1);
            }, error => {
                console.log(error);
            });
        }
    },
    mounted() {
        this.api.fetchTodos(data => {
            this.items = data;
        }, error => {
            console.log("error");
        });
    }, 
    created() {
        this.$emit("update:layout", DefaultLayout);
    },
}
</script>

<template>
  <div class="view">
    <header class="view-header flex mb-8 pt-16 px-16">
        <div class="view-header__content flex w-full max-w-screen-md mx-auto">    
           <h2 class="text-2xl font-bold">Tasks</h2>
        </div>
    </header>
    <div class="view-content max-w-screen-md mx-auto">
        <ul class="items list-none divide-y">
            <todo-item v-for="item in items" :item="item" :key="item.id" @remove="removeTodo">
            </todo-item>
            <create-todo @created="addTodo"/>
        </ul>
        </div>
    </div>
</template>