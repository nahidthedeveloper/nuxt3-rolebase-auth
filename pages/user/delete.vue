<script setup>
import { useUsersStore } from "~/stores/userStore";

const usersStore = useUsersStore();

</script>

<template>
    <div :class="{
        'grid': true,
        'grid-cols-5': usersStore.isOpen,
        'grid-cols-4': !usersStore.isOpen
    }">
        <div class="col-auto"></div>
        <div class="border p-8 col-span-4 mb-8">
            delete page here
        </div>
    </div>
</template>