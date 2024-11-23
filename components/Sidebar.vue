<script setup lang="js">
import { useUsersStore } from "~/stores/userStore";
import { useRoute } from 'vue-router';

const usersStore = useUsersStore();
const route = useRoute();

const sideList = [
    {
        "id": 1,
        "name": "View User",
        "path": "/user/list"
    },
    {
        "id": 2,
        "name": "Add User",
        "path": "/user/add"
    },
    {
        "id": 3,
        "name": "Edit User",
        "path": "/user/edit"
    },
    {
        "id": 4,
        "name": "Delete User",
        "path": "/user/delete"
    }
];
</script>

<template>
    <!-- drawer init and show -->

    <button type="button" @click="usersStore.isOpen = true">
        <span v-if="!usersStore.isOpen"
            :class="{ 'translate-x-0': usersStore.isOpen, '-translate-x-full': !usersStore.isOpen }">
            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" color="white" viewBox="0 0 24 24"
                width="24px" height="24px" fill="currentColor">
                <path
                    d="M19,2H5C2.243,2,0,4.243,0,7v10c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5V7c0-2.757-2.243-5-5-5ZM2,17V7c0-1.654,1.346-3,3-3h4V20H5c-1.654,0-3-1.346-3-3Zm20,0c0,1.654-1.346,3-3,3H11V4h8c1.654,0,3,1.346,3,3v10ZM7,11c0,.553-.447,1-1,1h-1c-.553,0-1-.447-1-1s.447-1,1-1h1c.553,0,1,.447,1,1Zm0,4c0,.553-.447,1-1,1h-1c-.553,0-1-.447-1-1s.447-1,1-1h1c.553,0,1,.447,1,1ZM4,7c0-.553,.447-1,1-1h1c.553,0,1,.447,1,1s-.447,1-1,1h-1c-.553,0-1-.447-1-1Z" />
            </svg>
        </span>
    </button>

    <!-- drawer component -->
    <div :class="{ 'translate-x-0': usersStore.isOpen, '-translate-x-full': !usersStore.isOpen }"
        class="fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform bg-purple-700 dark:bg-gray-800">
        <h5 class="text-xl font-semibold uppercas text-white">Menu</h5>
        <button type="button"
            class="mt-1 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center"
            @click="usersStore.isOpen = false">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
            </svg>
            <span class="sr-only">Close menu</span>
        </button>
        <div class="py-4 overflow-y-auto">
            <ul class="space-y-2 font-medium">
                <li v-for="list in sideList" :key="list.id">
                    <NuxtLink :href="list.path" class="flex items-center p-2 rounded-lg text-white hover:bg-purple-500"
                        :class="{ 'bg-purple-500': route.path === list.path }">
                        <span class="ms-3">{{ list.name }}</span>
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>
