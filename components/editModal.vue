<script setup lang="js">
import { ref, reactive, onMounted } from 'vue';

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  permissions: {
    type: Array,
    required: true,
  },
});

const isOpen = ref(false);

const openModal = () => {
  isOpen.value = true;

  if (props.user.permissions) {
    state.selectedPermission = props.user.permissions.map(permission => permission.id);
  }
}

const closeModal = () => {
  isOpen.value = false;
}

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

onMounted(() => {
  if (props.user) {
    state.username = props.user.username;
    state.email = props.user.email;
    state.role = props.user.role;
  }

  if (props.user.permissions) {
    state.selectedPermission = props.user.permissions.map(permission => permission.id);
  }
});

async function onSubmit() {
  console.log('Submitted State:', state);
}
</script>

<template>
  <div>
    <button @click="openModal" class="bg-blue-500 text-white p-2 rounded flex items-center space-x-2">
      Edit
    </button>

    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg relative w-full max-w-md">
        <button @click="closeModal"
          class="absolute top-4 right-4 text-2xl text-gray-500 bg-transparent hover:text-black">
          x
        </button>

        <h2 class="text-2xl mb-4">Edit User</h2>

        <div class="mb-5">
          <p>ID: {{ user.id }}</p>

          <form @submit.prevent="onSubmit" class="space-y-4">
            <div class="flex flex-col">
              <label for="username" class="text-sm font-semibold mb-2">Username</label>
              <input v-model="state.username" id="username" type="text" class="border border-gray-300 p-2 rounded" />
            </div>

            <div class="flex flex-col">
              <label for="email" class="text-sm font-semibold mb-2">Email</label>
              <input v-model="state.email" id="email" type="email" class="border border-gray-300 p-2 rounded" />
            </div>

            <div class="flex flex-col">
              <label for="role" class="text-sm font-semibold mb-2">Role</label>
              <select v-model="state.role" id="role" class="border border-gray-300 p-2 rounded">
                <option v-for="option in options" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>

            <div class="flex flex-col">
              <label for="permissions" class="text-sm font-semibold mb-2">Permissions</label>
              <select v-model="state.selectedPermission" id="permissions" multiple
                class="border border-gray-300 p-2 rounded">
                <option v-for="permission in props.permissions" :key="permission.id" :value="permission.id">
                  {{ permission.name }}
                </option>
              </select>
            </div>
          </form>
        </div>

        <div class="flex gap-4 justify-center">
          <button @click="closeModal" class="bg-blue-500 text-white p-2 rounded">
            Cancel
          </button>
          <button @click="onSubmit" class="bg-green-500 text-white p-2 rounded" type="submit">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
