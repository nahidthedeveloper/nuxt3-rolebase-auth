<script setup>
import { useUsersStore } from "~/stores/usersStore";
import { useTodosStore } from "~/stores/todosStore";
import { reactive } from 'vue';

const usersStore = useUsersStore();
const todosStore = useTodosStore();

const { $api } = useNuxtApp()

const form = reactive({
    todo: ''
});

const error = reactive({
    todo: ''
});

const handleTodoSubmit = async () => {
    Object.keys(error).forEach((key) => {
        error[key] = "";
    });

    try {
        const res = await $api(`/todos/`, {
            method: "POST",
            body: form,
        });
        if (res.detail) {
            alert(res.detail);
            form.todo = ''
            todosStore.fetchTodos()
        }

    } catch (err) {

        if (err.data.detail) {
            alert(err.data.detail);
        }

        if (err.data) {
            const errorData = err.data;
            Object.keys(errorData).forEach((key) => {
                if (error.hasOwnProperty(key)) {
                    error[key] = errorData[key][0];
                }
            });
        } else {
            alert("Unexpected error:", err);
        }
    }
};


</script>

<template>
    <div :class="{
        'grid': true,
        'grid-cols-5': usersStore.isOpen,
        'grid-cols-4': !usersStore.isOpen
    }">
        <div class="col-auto"></div>
        <div class="border overflow-x-auto col-span-4 mb-8">
            <form class="my-10 flex w-full justify-center" @submit.prevent="handleTodoSubmit">
                <div>
                    <div class="flex gap-6">
                        <input type="text" id="todo" placeholder="Add todo" v-model="form.todo"
                            class="w-96 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5" />
                        <button type="submit"
                            class="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            Add Todo
                        </button>
                    </div>
                    <h6 class="text-red-800 text-sm mt-1 ml-1" v-if="error.todo">{{ error.todo }}</h6>
                </div>
            </form>

            <table class="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                            No
                        </th>
                        <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                            Todo
                        </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    <tr v-for="(todo, index) in todosStore.todosList" :key="index" class="hover:bg-gray-100">
                        <td class="px-6 py-4 text-start whitespace-nowrap text-sm font-medium text-gray-800">
                            {{ index + 1 }}
                        </td>
                        <td class="px-6 py-4 text-start whitespace-nowrap text-sm text-gray-800">
                            {{ todo.todo }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>