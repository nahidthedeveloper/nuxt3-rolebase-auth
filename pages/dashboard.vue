<script setup>
import { useNuxtApp } from "#app";
import { computed } from "vue";
import CreateUserModal from "~/components/createUserModal.vue";
import DeleteModal from "~/components/deleteModal.vue";
import EditModal from "~/components/editModal.vue";

const { $api } = useNuxtApp();

const { data, pending, error, refresh } = useAsyncData("users", async () => {
  try {
    const [users, permissions, login_user_permissions] = await Promise.all([
      $api("/user/"),
      $api("/user/authentication_permissions/"),
      $api("/user/login_user_permissions/"),
    ]);

    return { users, permissions, login_user_permissions };
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  }
});

const permissions = computed(() => {
  const log_user_per = data.value?.login_user_permissions?.user_permissions || [];
  return {
    add: log_user_per.some((per) => per.id === 49),
    update: log_user_per.some((per) => per.id === 50),
    delete: log_user_per.some((per) => per.id === 51),
    view: log_user_per.some((per) => per.id === 52),
  };
});

const all_permissions = computed(() => {
  return data.value.permissions.permissions;
})

</script>

<template>
  <div class="flex justify-end" v-if="permissions.view">
    <button @click="refresh"
      class="text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5">
      Refresh
    </button>
  </div>
  <div v-if="permissions.view">
    <div class="flex justify-between my-6">
      <h1 class="text-2xl font-bold text-black">All User Information</h1>
      <CreateUserModal v-if="permissions.add" :refresh="refresh" />
    </div>

    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
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
          <tr v-for="(user, index) in data.users" :key="index" class="hover:bg-gray-100">
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
              <EditModal v-if="permissions.update" :user="user" :permissions="all_permissions" :refresh="refresh" />
              <DeleteModal v-if="permissions.delete" :id="user.id" :refresh="refresh" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <h1 v-else class="text-center">You have no permission to view this page.</h1>
</template>
