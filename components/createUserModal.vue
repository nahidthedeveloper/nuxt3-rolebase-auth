<script setup lang="js">
import { ref, reactive } from 'vue';

const props = defineProps({
  refresh: {
    type: Function,
    required: true,
  }
});

const isOpen = ref(false);
const { $api } = useNuxtApp();

const openModal = () => {
  isOpen.value = true;
}

const closeModal = () => {
  isOpen.value = false;
}

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirm_password: '',
  role: ''
});

const error = reactive({
  username: '',
  email: '',
  password: '',
  confirm_password: '',
  role: ''
});

const options = [
  { label: 'Admin', value: 'admin' },
  { label: 'User', value: 'user' },
];

const resetForm = () => {
  form.username = '';
  form.email = '';
  form.password = '';
  form.confirm_password = '';
  form.role = '';
};

const handleSignUp = async () => {
  Object.keys(error).forEach((key) => {
    error[key] = '';
  });

  try {
    const res = await $api(`/user/`, {
      method: 'POST',
      body: form,
    });
    alert(res.detail);
    props.refresh();
    resetForm();
    isOpen.value = false;
  } catch (err) {
    if (err.data) {
      const errorData = err.data;
      Object.keys(errorData || {}).forEach((key) => {
        if (error.hasOwnProperty(key)) {
          error[key] = errorData[key][0];
        }
      });
    } else {
      alert(`Unexpected error: ${err.message || err}`);
    }
  }
};
</script>

<template>
  <div>
    <button @click="openModal" class="bg-blue-500 text-white p-2 rounded flex items-center space-x-2">
      Add User
    </button>

    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg relative w-full max-w-md">
        <button @click="closeModal"
          class="absolute top-4 right-4 text-2xl text-gray-500 bg-transparent hover:text-black">
          x
        </button>

        <h2 class="text-2xl mb-4">Create User</h2>

        <div class="mb-5">
          <form class="space-y-4 md:space-y-6" @submit.prevent="handleSignUp">
            <div>
              <label for="username"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
              <input type="text" id="username" placeholder="Username" v-model="form.username"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              <h6 class="text-red-800 text-sm mt-1 ml-1" v-if="error.username">{{ error.username }}</h6>
            </div>
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input type="text" id="email" placeholder="Email" v-model="form.email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              <h6 class="text-red-800 text-sm mt-1 ml-1" v-if="error.email">{{ error.email }}</h6>
            </div>
            <div class="flex flex-col">
              <label for="role" class="text-sm font-semibold mb-2">Role</label>
              <select v-model="form.role" id="role" class="border border-gray-300 p-2 rounded">
                <option v-for="option in options" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
              <h6 class="text-red-800 text-sm mt-1 ml-1" v-if="error.role">{{ error.role }}</h6>
            </div>
            <div>
              <label for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input type="password" id="password" placeholder="••••••••" v-model="form.password"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              <h6 class="text-red-800 text-sm mt-1 ml-1" v-if="error.password">{{ error.password }}</h6>
            </div>
            <div>
              <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm
                Password</label>
              <input type="password" id="confirm_password" placeholder="••••••••" v-model="form.confirm_password"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              <h6 class="text-red-800 text-sm mt-1 ml-1" v-if="error.confirm_password">{{ error.confirm_password }}</h6>
            </div>
          </form>
        </div>

        <div class="flex gap-4 justify-center">
          <button @click="closeModal" class="bg-blue-500 text-white p-2 rounded">
            Cancel
          </button>
          <button @click="handleSignUp" class="bg-green-500 text-white p-2 rounded" type="submit">
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
