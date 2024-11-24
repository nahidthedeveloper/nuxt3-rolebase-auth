import { defineStore } from "pinia";

export const usePermissionsStore = defineStore("permissions", {
  state: () => ({
    permissionsList: [],
    loading: true,
    error: null,
  }),

  actions: {
    async fetchPermissions() {
      this.loading = true;
      this.error = null;
      const { $api } = useNuxtApp();

      try {
        const permissions = await $api("/user/permissions/");
        this.permissionsList = permissions.permissions;
      } catch (err) {
        console.error("Error fetching data:", err);
        this.error = "Failed to fetch user data";
      } finally {
        this.loading = false;
      }
    },
  },
});
