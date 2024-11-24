import { defineStore } from "pinia";

export const useUsersStore = defineStore("users", {
  state: () => ({
    userList: [],
    loading: true,
    error: null,

    // sidebar toggle
    isOpen: false,
  }),

  actions: {
    async fetchUsers() {
      this.loading = true;
      this.error = null;
      const { $api } = useNuxtApp();

      try {
        const users = await $api("/user/");
        this.userList = users;
      } catch (err) {
        console.error("Error fetching data:", err);
        this.error = "Failed to fetch user data";
      } finally {
        this.loading = false;
      }
    },
  },
});
