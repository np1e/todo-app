<script>
import { isAfter, subDays, addDays, isSameDay, format, compareAsc, compareDesc, parseISO } from 'date-fns';

export default {
    name: "TodoItem",
    data() {
        return {
            test: "test"
        }
    }, 
    props: {
        item: Object
    },
    methods: {
        remove() {
            this.$emit('remove', this.item);
        }
    },
    computed: {
        overdueClass() {
            return {
                'text-red-400': this.isOverdue,
                'text-gray-400': !this.isOverdue
            }
        },
        dueDate() {
            return parseISO(this.item.dueDate);
        },
        isOverdue() {
            isAfter(new Date(), this.dueDate) && !isSameDay(this.dueDate, new Date());
        },
        formattedDate() {
            const today = new Date();
            const yesterday = subDays(today, 1);
            const tomorrow = addDays(today, 1);

            if(isSameDay(this.dueDate, yesterday)) {
                return "Yesterday";
            } else if (isSameDay(this.dueDate, tomorrow)) {
                return "Tomorrow";
            } else if (isSameDay(this.dueDate, today)) {
                return "Today";
            } else {
                return format(this.dueDate, 'd MMM');
            }
        }
    },
    emits: ['remove']
}
</script>

<template>
    <li class="task flex items-start py-3 w-full hover:bg-gray-100 transition-colors">
        <button role="checkbox" class="task_checkbox border-none mr-2 mt-1">
            <div class="task_checkbox__circle border border-gray-500 rounded-full hover:bg-gray-200 transition-colors">
                <svg class="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12"/>
                </svg>
            </div>
        </button>
        <div class="task-details w-full flex justify-between">
            <div class="task-details flex flex-col">
                <h3 class="text-base mb-1">
                    {{ item.title }}
                </h3>
                <p class="text-xs text-gray-400 pb-1">{{ item.description }}</p>
                <p class="text-xs" :class="overdueClass">{{ formattedDate }}</p>
            </div>
            <button @click="remove" class="task_delete">
                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
            </button>
        </div>
    </li>
</template>