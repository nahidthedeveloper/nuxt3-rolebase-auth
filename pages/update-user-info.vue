<script setup lang="js">
import { reactive } from "vue";

const { $api } = useNuxtApp();

definePageMeta({
  middleware: "private"
})

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

const handleSignUp = async () => {
  Object.keys(error).forEach(key => {
    error[key] = '';
  });

  try {
    const res = await $api.post('/auth/signup/', form);
    console.log(res);
  } catch (err) {
    if (err.response && err.response.data) {
      const errorData = err.response.data;
      Object.keys(errorData).forEach(key => {
        if (error.hasOwnProperty(key)) {
          error[key] = errorData[key][0];
        }
      });
    }
  }
};
</script>
<template>
  <div class="grid grid-cols-4">
    <div class="col-span-1">
      <SidePanel />
    </div>
    <div class="col-span-3">
      <div class="pb-16">
        <form class="w-full grid grid-cols-1 md:grid-cols-2 gap-8 justify-center" @submit.prevent="handleSignUp">
          <div class="col-span-1">
            <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
            <input type="text" id="username" placeholder="Username" v-model="form.username"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            <h6 class="text-red-800 text-sm mt-1 ml-1" v-if="error.username">{{ error.username }}</h6>
          </div>

          <div class="col-span-1">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input type="text" id="email" placeholder="Email" v-model="form.email"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            <h6 class="text-red-800 text-sm mt-1 ml-1" v-if="error.email">{{ error.email }}</h6>
          </div>

          <div class="col-span-1">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input type="password" id="password" placeholder="••••••••" v-model="form.password"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            <h6 class="text-red-800 text-sm mt-1 ml-1" v-if="error.password">{{ error.password }}</h6>
          </div>

          <div class="col-span-1">
            <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm
              Password</label>
            <input type="password" id="confirm_password" placeholder="••••••••" v-model="form.confirm_password"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            <h6 class="text-red-800 text-sm mt-1 ml-1" v-if="error.confirm_password">{{ error.confirm_password }}</h6>
          </div>

          <div class="col-span-1">
            <label for="role" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Role</label>
            <select id="role" v-model="form.role"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="">-Select Role-</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
            </select>
            <h6 class="text-red-800 text-sm mt-1 ml-1" v-if="error.role">{{ error.role }}</h6>
          </div>

          <button type="submit"
            class="col-span-2 w-full text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Create user
          </button>
        </form>

      </div>
    </div>
  </div>
</template>
