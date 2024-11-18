<script setup lang="js">

</script>

<template>
  <!--  dark:bg-gray-900-->
  <div class="bg-gray-50 h-screen w-screen">
    <NuxtLoadingIndicator />
    <Navbar />
    <NuxtLayout name="custom">
      <div class="max-w-screen-xl mx-auto p-4">
        <NuxtPage />
      </div>
    </NuxtLayout>
  </div>
</template>