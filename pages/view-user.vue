<script setup lang="js">
definePageMeta({
  middleware: "auth"
})
</script>
<template>
  <div class="grid grid-cols-4">
    <div class="col-span-1">
      <SidePanel/>
    </div>
    <div class="col-span-3">
      <div class="flex flex-col items-center gap-4">
        view user
      </div>
    </div>
  </div>
</template>
