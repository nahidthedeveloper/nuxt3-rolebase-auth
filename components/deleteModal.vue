<script setup lang="js">
import { defineProps } from 'vue';

const props = defineProps({
  id: Number,
  refresh: {
    type: Function,
    required: true
  },
})

const isOpen = ref(false);
const { $api } = useNuxtApp();

async function deleteUserHandler(userId) {
  try {
    const res = await $api(`/user/${userId}/`, {
      method: 'DELETE',
    });
    alert(res.detail);
    props.refresh()
  } catch (err) {
    alert('Failed to delete the user. Please try again later.');
  }
}

</script>

<template>
  <div>
    <!-- Delete Button -->
    <button @click="isOpen = true" class="bg-red-500 text-white p-2 rounded flex items-center space-x-2">
      Delete
    </button>

    <!-- Modal -->
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg relative w-[340px]">
        <!-- Close Button -->
        <button @click="isOpen = false"
          class="absolute top-4 right-4 text-2xl text-gray-500 bg-transparent hover:text-black">
          x
        </button>

        <!-- Icon -->
        <div class="flex justify-center mb-2">
          delete icon here
        </div>

        <!-- Confirmation Text -->
        <h1 class="text-center mb-5">
          Are you sure to delete this user? id: {{ id }}
        </h1>

        <!-- Action Buttons -->
        <div class="flex gap-4 justify-center">
          <button @click="isOpen = false" class="bg-blue-500 text-white p-2 rounded">Cancel</button>
          <button @click="deleteUserHandler(id)" class="bg-red-500 text-white p-2 rounded">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>
