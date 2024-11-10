<script setup>
import {NuxtLink} from '#components';

const route = useRoute();
const isActive = (path) => route.path === path;
</script>
<template>
  <div class="w-80 h-full bg-purple-700 p-10 fixed left-0 top-16">
    <ul class="text-white">
      <li>
        <NuxtLink
            to="/view-user"
            :class="['block p-4 cursor-pointer transition ease-in-out', isActive('/view-user') ? 'bg-blue-800' : 'hover:bg-blue-800']"
        >
          View User
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
            to="/add-user"
            :class="['block p-4 cursor-pointer transition ease-in-out', isActive('/add-user') ? 'bg-blue-800' : 'hover:bg-blue-800']"
        >
          Add User
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
            to="/update-user-info"
            :class="['block p-4 cursor-pointer transition ease-in-out', isActive('/update-user-info') ? 'bg-blue-800' : 'hover:bg-blue-800']"
        >
          Update User Info
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
            to="/delete-user"
            :class="['block p-4 cursor-pointer transition ease-in-out', isActive('/delete-user') ? 'bg-blue-800' : 'hover:bg-blue-800']"
        >
          Delete User
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
