<script setup lang="js">
definePageMeta({
  middleware: "auth"
})

import { ref, onMounted } from 'vue';

const { $api } = useNuxtApp()

const users = ref([]);

try {
  const response = await $api.get('/user/');
  users.value = response.data
} catch (error) {
  console.error('Error fetching data:', error);
}

</script>
<template>
  <div class="grid grid-cols-4">
    <div class="col-span-1">
      <SidePanel />
    </div>
    <div class="col-span-3">
      <div class="flex flex-col items-center gap-4">
        <h1 class="text-2xl text-center font-bold">User List</h1>

        <div
          class="flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
          <table class="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                <th class="p-4 border-b border-slate-300 bg-slate-50">
                  <p class="block text-sm font-normal leading-none text-slate-500">
                    Username
                  </p>
                </th>
                <th class="p-4 border-b border-slate-300 bg-slate-50">
                  <p class="block text-sm font-normal leading-none text-slate-500">
                    Email
                  </p>
                </th>
                <th class="p-4 border-b border-slate-300 bg-slate-50">
                  <p class="block text-sm font-normal leading-none text-slate-500">
                    Role
                  </p>
                </th>
                <th class="p-4 border-b border-slate-300 bg-slate-50">
                  <p class="block text-sm font-normal leading-none text-slate-500"></p>
                </th>
              </tr>
            </thead>
            <tbody>
              <!-- Show a loading state or placeholder if data is not yet available -->
              <tr v-if="users.length === 0">
                <td colspan="4" class="p-4 text-center text-slate-800">Loading...</td>
              </tr>
              <tr v-for="user in users" :key="user.id" class="hover:bg-slate-50">
                <td class="p-4 border-b border-slate-200">
                  <p class="block text-sm text-slate-800">{{ user.username }}</p>
                </td>
                <td class="p-4 border-b border-slate-200">
                  <p class="block text-sm text-slate-800">{{ user.email }}</p>
                </td>
                <td class="p-4 border-b border-slate-200">
                  <p class="block text-sm text-slate-800">{{ user.role }}</p>
                </td>
                <td class="p-4 border-b border-slate-200">
                  <a href="#" class="block text-sm font-semibold text-slate-800">
                    Edit
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  </div>
</template>
