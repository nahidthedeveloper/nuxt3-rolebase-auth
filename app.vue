<script setup lang="ts">
import { useUsersStore } from "~/stores/usersStore";
import { useTodosStore } from "~/stores/todosStore";
import { usePermissionsStore } from "~/stores/permissionsStore";
import { useUserPermissionStore } from "~/stores/userPermissionsStore";
import { useRequestHeaders } from "#app";


const usersStore = useUsersStore();
const todosStore = useTodosStore();
const permissionsStore = usePermissionsStore()
const userPermissonsStore = useUserPermissionStore()

const headers = useRequestHeaders(["cookie"]);
const { data: session } = await useAsyncData("session", () =>
  $fetch("/api/token", {
    headers,
  })
);

const isAdmin = computed(() => session?.value?.role === "admin");

if (session.value && !isAdmin.value) {
  const { } = await useAsyncData("fetchUserPermission", async () => {
    await userPermissonsStore.fetchUserPermissions();
    return userPermissonsStore.userPermissionsList;
  });
  const { } = await useAsyncData("fetchTodos", async () => {
    await todosStore.fetchTodos();
    return todosStore.todosList;
  });
}


if (isAdmin.value) {
  const { } = await useAsyncData("fetchUsers", async () => {
    await usersStore.fetchUsers();
    return usersStore.userList;
  });
  const { } = await useAsyncData("fetchPermissions", async () => {
    await permissionsStore.fetchPermissions();
    return permissionsStore.permissionsList;
  });
}

</script>


<template>
  <div class="bg-gray-50 h-screen w-screen">
    <NuxtLoadingIndicator />
    <Navbar />
    <NuxtLayout name="custom">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>c