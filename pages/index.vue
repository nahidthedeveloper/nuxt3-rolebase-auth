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
    <div><span class="font-bold">Users:</span> {{ data.users }}</div>
    <div><span class="font-bold">Permissions:</span> {{ data.permissions }}</div>
    <div><span class="font-bold">Login User Permission:</span> {{ data.login_user_permissions }}</div>
  </div>
</template>



<!--<script setup lang="js">-->
<!--import { ref } from 'vue';-->

<!--definePageMeta({-->
<!--  middleware: "private"-->
<!--});-->

<!--const { data } = useAuth();-->
<!--const isAdmin = ref(false);-->


<!--watchEffect(() => {-->
<!--  if (data.value?.user?.role === 'admin') {-->
<!--    isAdmin.value = true;-->
<!--  } else {-->
<!--    isAdmin.value = false;-->
<!--  }-->
<!--});-->
<!--</script>-->

<!--<template>-->
<!--  <div class="grid grid-cols-4">-->
<!--    <div v-if="isAdmin" class="col-span-1">-->
<!--      <SidePanel />-->
<!--    </div>-->
<!--    <div :class="[isAdmin ? 'col-span-3' : 'col-span-4']">-->
<!--      <div class="flex flex-col items-center gap-4">-->
<!--        <h1 class="text-3xl font-bold">Hello, {{ data.user?.name }}</h1>-->
<!--        <p>Email: {{ data.user?.email }}</p>-->
<!--        <p>Role: {{ data.user?.role }}</p>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->