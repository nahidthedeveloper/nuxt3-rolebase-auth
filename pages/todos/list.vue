<script setup>
import { useUsersStore } from "~/stores/usersStore";
import { useTodosStore } from "~/stores/todosStore";

const usersStore = useUsersStore();
const todosStore = useTodosStore();

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