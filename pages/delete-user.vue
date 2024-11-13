<script setup lang="js">
definePageMeta({
  middleware: "private"
})
</script>
<template>
  <div class="grid grid-cols-4">
    <div class="col-span-1">
      <SidePanel/>
    </div>
    <div class="col-span-3">
      <div class="flex flex-col items-center gap-4">
        delete user info
      </div>
    </div>
  </div>
</template>
