<script setup lang="js">
import { ref, reactive, onMounted } from 'vue';

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  permissions: {
    type: Object,
    required: true,
  },
});

const isOpen = ref(false);

const state = reactive({
  username: '',
  email: '',
  role: '',
  selectedPermission: [],
});

const options = [
  { label: 'Admin', value: 'admin' },
  { label: 'Manager', value: 'manager' },
  { label: 'User', value: 'user' },
];

const selectPermissions = computed(() => {
  return props.permissions.permissions.map((permission) => (
    {
      label: permission.name,
      value: permission.id
    }
  ))
})

const userPermission = computed(() => {
  return props.user.permissions.map((permission) => (
    {
      label: permission.name,
      value: permission.id
    }
  ))
})

async function onSubmit() {
  console.log('Submitted State:', state);
}
</script>

<template>
  <div>
    <!-- Edit Button -->
    <UButton @click="isOpen = true" color="blue" icon="material-symbols:edit-square-outline" />

    <!-- Modal -->
    <UModal v-model="isOpen">
      <div class="p-4 relative">
        <!-- Close Button -->
        <UButton @click="isOpen = false" icon="gridicons:cross"
          class="absolute bg-transparent text-2xl top-4 right-4" />

        <h2 class="text-2xl mb-4">Edit User</h2>

        <!-- User ID -->
        <div class="text-center mb-5">
          <p>ID: {{ user.id }}</p>
          {{ userPermission }}
          <!-- Form -->
          <UForm :state="state" class="space-y-4" @submit="onSubmit">
            <!-- Username -->
            <UFormGroup label="Username" name="username">
              <UInput v-model="state.username" />
            </UFormGroup>

            <!-- Email -->
            <UFormGroup label="Email" name="email">
              <UInput v-model="state.email" type="email" />
            </UFormGroup>

            <!-- Role Dropdown -->
            <UFormGroup name="role" label="Role">
              <USelect v-model="state.role" placeholder="Select Role" :options="options" />
            </UFormGroup>

            <!-- Permissions Dropdown -->
            <UFormGroup name="per" label="Permissions">
              <USelectMenu v-model="state.selectedPermission" multiple placeholder="Select Permissions"
                :options="selectPermissions" />
            </UFormGroup>
          </UForm>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-4 justify-center">
          <UButton @click="isOpen = false" color="blue">Cancel</UButton>
          <UButton @click="onSubmit" color="green" type="submit">Save</UButton>
        </div>
      </div>
    </UModal>
  </div>
</template>
