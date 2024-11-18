<script setup lang="js">

</script>

<template>
  <!--  dark:bg-gray-900-->
  <div class="bg-gray-50 h-screen w-screen">
    <NuxtLoadingIndicator/>
    <Navbar/>
    <NuxtLayout name="custom">
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>c