<script setup>
</script>

<script>
export default {
    name: 'CreateTodo',
    inject: ['api'],
    components: {
    },
    data() {
        return {
            title: "",
            description: "",
            dueDate: undefined,
            errors: []
        }
    },
    props: {
    },
    methods: {
        addTodo(event) {
            if (this.checkInputs()) {    
                this.api.createTodo(
                {
                    title: this.title,
                    description: this.description,
                    ...(this.dueDate && { date: this.dueDate })
                }, res  => {
                    console.log(res);
                    this.$emit('created', res);
                    this.title = "";
                    this.description = "";
                    this.dueDate = undefined;
                }, error  => {
                    console.log(error);
                });
            } else {
                console.log(this.errors);
            }
            event.preventDefault();
        },
        checkInputs() {
            this.errors = [];
            if (!this.title) {
                this.errors.push({ title: 'Title is required' });
            }

            if (!this.errors.length) {
                return true;
            }

            return false;
        }
    },
    computed: {
        titleError() {
            return this.errors.find(error => 'title' in error);
        }
    },
    mounted() {
    },
    emits: ['created']
}
</script>

<template>
    <form @submit="addTodo" class="todo__create pt-2">
        <div class="flex flex-col space-y-2 items-start">
            <input placeholder="Give your task a title" name="title" v-model="title"
                :class="{ 'border-red-500' : titleError }"
                class="text-base appearance-none bg-transparent border rounded w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none focus:outline-none focus:border-gray-400 transition-all" type="text">
            <p v-if="titleError" class="text-red-500 text-xs italic">{{ titleError.title }}</p>
            <textarea placeholder="Description" name="description" v-model="description"
                class="text-sm form-textarea appearance-none bg-transparent border rounded w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none focus:border-gray-400 transition-all"></textarea>
            <button type="submit" class="rounded bg-red-500 text-sm hover:bg-red-400 transition-all text-white py-2 px-4">
                Add task
            </button>
        </div>
    </form>
</template>