<script setup lang="js">
import { useUsersStore } from "~/stores/userStore";

const usersStore = useUsersStore();

const { error } = await useAsyncData("fetchUsers", async () => {
  if (!usersStore.userList.length) {
    await usersStore.fetchUserWithOther();
  }
  return usersStore.userList;
});

</script>

<template>
  <!--  dark:bg-gray-900-->
  <div class="bg-gray-50 h-screen w-screen">
    <NuxtLoadingIndicator />
    <Navbar />
    <NuxtLayout name="custom">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>c