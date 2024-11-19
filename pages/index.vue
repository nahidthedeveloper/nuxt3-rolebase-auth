<script setup lang="js">
import { ref } from 'vue';

const { data } = useAuth();
const isAdmin = ref(false);


watchEffect(() => {
  if (data.value?.user?.role === 'admin') {
    isAdmin.value = true;
  } else {
    isAdmin.value = false;
  }
});
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <h1 class="text-3xl font-bold">Hello, {{ data.user?.name }}</h1>
    <p>Email: {{ data.user?.email }}</p>
    <p>Role: {{ data.user?.role }}</p>
  </div>
</template>