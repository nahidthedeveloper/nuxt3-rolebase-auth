<script setup>
import { useUsersStore } from "~/stores/usersStore";
import { useTodosStore } from "~/stores/todosStore";

const usersStore = useUsersStore();
const todosStore = useTodosStore();

const { $api } = useNuxtApp()

const handleTodoDelete = async (id) => {
    try {
        const res = await $api(`/todos/${id}/`, {
            method: "DELETE",
        });
        if (res.detail) {
            alert(res.detail);
            todosStore.fetchTodos()
        }
        console.log(res.data);
        
    } catch (err) {
        if (err.data.detail) {
            alert(err.data.detail);
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
            <table class="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                            No
                        </th>
                        <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                            Todo
                        </th>
                        <th>
                            Action
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
                        <th>
                            <button class="bg-red-700 px-4 py-2 hover:bg-red-500 text-white rounded"
                                @click="handleTodoDelete(todo.id)">Delete</button>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>