<script setup lang="js">
import { ref, reactive } from 'vue';

const { signIn } = useAuth();

const form = ref({
  email_or_username: '',
  password: ''
});
const error = reactive({
  email_or_username: '',
  password: ''
});

const handleSignIn = async () => {
  error.email_or_username = '';
  error.password = '';

  await signIn('credentials', {
    username: form.value.email_or_username,
    password: form.value.password,
    redirect: false
  }).then((response) => {
    if (response?.error) {
      try {
        const errors = JSON.parse(response.error);
        errors.forEach((e) => {

          if (e.name === 'username_or_email') {
            error.email_or_username = e.message[0];
          } else if (e.name === 'password') {
            error.password = e.message[0];
          }
        });
      } catch (parseError) {
        console.log(parseError);
      }
    } else {
      navigateTo('/');
    }
  });
};
</script>


<template>
  <form class="space-y-4 md:space-y-6" action="#" @submit.prevent="handleSignIn">
    <div>
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email or Username</label>
      <input type="text" id="email" placeholder="Email or Username" v-model="form.email_or_username"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      <h6 class="text-red-800 text-sm mt-1 ml-1" v-if="error.email_or_username">{{ error.email_or_username }}</h6>
    </div>
    <div>
      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
      <input type="password" id="password" placeholder="••••••••" v-model="form.password"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      <h6 class="text-red-800 text-sm mt-1 ml-1" v-if="error.password">{{ error.password }}</h6>
    </div>
    <div class="flex items-center justify-between">
      <NuxtLink to="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
        Forgot password?
      </NuxtLink>
    </div>
    <button type="submit"
      class="w-full text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
      Sign in
    </button>
    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
      Don’t have an account yet?
      <NuxtLink to="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</NuxtLink>
    </p>
  </form>
</template>
