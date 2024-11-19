<script setup>
import { useNuxtApp } from "#app";

const { $api } = useNuxtApp();


const { data, pending, error, refresh } = useAsyncData('users', async () => {
    try {
        const [users, permissions, login_user_permissions] = await Promise.all([
            $api('/user/'),
            $api('/user/authentication_permissions/'),
            $api('/user/login_user_permissions/'),
        ]);

        return { users, permissions, login_user_permissions };
    } catch (err) {
        console.error("Error fetching data:", err);
        throw err;
    }
});


</script>


<template>
    <button @click="refresh"
        class=" text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Re-fetch</button>

    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>
        <!-- <div><span class="font-bold">Users:</span> {{ data.users }}</div> -->
        <div><span class="font-bold">Permissions:</span> {{ data.permissions }}</div>
        <div><span class="font-bold">Login User Permission:</span> {{ data.login_user_permissions }}</div>
    </div>


    <div class="overflow-hidden border">
        <table class="min-w-full divide-y divide-gray-200">
            <thead>
                <tr>
                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                        No
                    </th>
                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                        Username
                    </th>
                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                        Email
                    </th>
                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
                <tr v-for="(user, index) in data.users" :key="index" class="hover:bg-gray-100">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {{ index + 1 }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {{ user.username }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {{ user.email }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Edit
                        </button>
                        <button class="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>



</template>