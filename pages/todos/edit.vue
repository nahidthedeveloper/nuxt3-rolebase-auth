<script setup>
import { ref } from "vue";
import { useUsersStore } from "~/stores/usersStore";
import { useTodosStore } from "~/stores/todosStore";

const usersStore = useUsersStore();
const todosStore = useTodosStore();

const { $api } = useNuxtApp()

const editingId = ref(null);
const editingText = ref("");
const error = reactive({
    todo: ''
});

const handleTodoEdit = (todo) => {
    editingId.value = todo.id;
    editingText.value = todo.todo;
};
const handleCancel = () => {
    editingId.value = null;
    editingText.value = "";
};

const handleSave = async (id) => {
    Object.keys(error).forEach((key) => {
        error[key] = "";
    });

    try {
        const res = await $api(`/todos/${id}/`, {
            method: "PATCH",
            body: {
                'todo': editingText.value
            },
        });
        if (res.detail) {
            alert(res.detail);
            editingId.value = null
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
            <table class="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                            No
                        </th>
                        <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                            Todo
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    <tr v-for="(todo, index) in todosStore.todosList" :key="todo.id" class="hover:bg-gray-100">
                        <td class="px-6 py-4 text-start whitespace-nowrap text-sm font-medium text-gray-800">
                            {{ index + 1 }}
                        </td>
                        <td class="px-6 py-4 text-start whitespace-nowrap text-sm text-gray-800">
                            <div v-if="editingId === todo.id" class="w-full">
                                <input type="text" v-model="editingText" class="border px-2 py-1 w-full" />
                                <h6 class="text-red-800 text-sm mt-1 ml-1" v-if="error.todo">{{ error.todo }}</h6>
                            </div>
                            <div v-else>
                                {{ todo.todo }}
                            </div>
                        </td>
                        <td class="px-6 py-4 text-end whitespace-nowrap">
                            <div v-if="editingId === todo.id">
                                <button class="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-400"
                                    @click="handleSave(todo.id)">
                                    Save
                                </button>
                                <button class="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-400"
                                    @click="handleCancel">
                                    Cancel
                                </button>
                            </div>
                            <div v-else>
                                <button class="bg-purple-700 px-4 py-2 hover:bg-purple-500 text-white rounded"
                                    @click="handleTodoEdit(todo)">
                                    Edit
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
