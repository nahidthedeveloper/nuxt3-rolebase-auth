import { defineStore } from "pinia";

export const useUserPermissionStore = defineStore("userPermissions", {
  state: () => ({
    userPermissionsList: [],
    loading: true,
    error: null,
  }),

  actions: {
    async fetchUserPermissions() {
      this.loading = true;
      this.error = null;
      const { $api } = useNuxtApp();

      try {
        const permissions = await $api("/user/user_permissions/");
        this.userPermissionsList = permissions;
      } catch (err) {
        console.error("Error fetching data:", err);
        this.error = "Failed to fetch user data";
      } finally {
        this.loading = false;
      }
    },
  },
});
