<script setup lang="js">
import { defineProps } from 'vue';
const isOpen = ref(false);
defineProps({
  id: Number
})
</script>

<template>
  <div>
    <UButton @click="isOpen = true" color="red" icon="material-symbols:delete-outline" />

    <UModal v-model="isOpen" :ui="{ width: 'w-[340px]' }">
      <div class="p-4 relative">
        <UButton @click="isOpen = false" icon="gridicons:cross"
          class="absolute bg-transparent text-2xl top-4 right-4" />

        <div class="flex justify-center mb-2">
          <UIcon name="material-symbols:delete-outline" class="w-14 h-14" />
        </div>
        <h1 class="text-center mb-5">
          Are you sure to delete this user? id: {{ id }}
        </h1>

        <div class="flex gap-4 justify-center">
          <UButton @click="isOpen = false" color="blue">Cancel</UButton>
          <UButton @click="isOpen = false" color="red">Confirm</UButton>
        </div>
      </div>
    </UModal>
  </div>
</template>
