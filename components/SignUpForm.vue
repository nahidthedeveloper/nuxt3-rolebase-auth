<script setup lang="js">
import { reactive } from 'vue';

const { $api } = useNuxtApp()

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirm_password: '',
  role: 'user'
});

const error = reactive({
  username: '',
  email: '',
  password: '',
  confirm_password: ''
});

const handleSignUp = async () => {
  Object.keys(error).forEach((key) => {
    error[key] = "";
  });

  try {
    const res = await $api(`auth/signup/`, {
      method: "POST",
      body: form,
    });
    alert("Signup successful:", res);

  } catch (err) {
    if (err.data) {
      const errorData = err.data;
      Object.keys(errorData).forEach((key) => {
        if (error.hasOwnProperty(key)) {
          error[key] = errorData[key][0];
        }
      });
    } else {
      alert("Unexpected error:", err);
    }
  }
};
</script>

<template>
  <form class="space-y-4 md:space-y-6" @submit.prevent="handleSignUp">
    <div>
      <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
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
    <div>
      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
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
    <button type="submit"
      class="w-full text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
      Sign up
    </button>
  </form>
</template>
