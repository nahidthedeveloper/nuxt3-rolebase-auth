<script setup>
import CreateUserModal from "~/components/createUserModal.vue";
import DeleteModal from "~/components/deleteModal.vue";
import EditModal from "~/components/editModal.vue";
import { useUsersStore } from "~/stores/usersStore";
import { usePermissionsStore } from "~/stores/permissionsStore";

const usersStore = useUsersStore();
const permissionsStore = usePermissionsStore()

</script>

<template>
  <div class="flex justify-end">
    <button @click="usersStore.fetchUsers"
      class="text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5">
      Refresh
    </button>
  </div>
  <div>
    <div class="flex justify-between my-6">
      <h1 class="text-2xl font-bold text-black">All User Information</h1>
      <CreateUserModal :refresh="usersStore.fetchUsers" />
    </div>

    <div v-if="usersStore.loading">Loading...</div>
    <div v-else-if="usersStore.error">Error: {{ usersStore.error }}</div>
    <div v-else class="border overflow-x-auto">
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
          <tr v-for="(user, index) in usersStore.userList" :key="index" class="hover:bg-gray-100">
            <td class="px-6 py-4 text-start whitespace-nowrap text-sm font-medium text-gray-800">
              {{ index + 1 }}
            </td>
            <td class="px-6 py-4 text-start whitespace-nowrap text-sm text-gray-800">
              {{ user.username }}
            </td>
            <td class="px-6 py-4 text-start whitespace-nowrap text-sm text-gray-800">
              {{ user.email }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-start text-sm font-medium flex gap-4">
              <EditModal :user="user" :permissions="permissionsStore.permissionsList" :refresh="usersStore.fetchUsers" />
              <DeleteModal :id="user.id" :refresh="usersStore.fetchUsers" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
