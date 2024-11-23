import { defineStore } from "pinia";

export const useUsersStore = defineStore("users", {
  state: () => ({
    userList: [],
    userPermissions: [],
    permissions: [],
    loading: true,
    error: null,
  }),

  actions: {
    async fetchUserWithOther() {
      this.loading = true;
      this.error = null;
      const { $api } = useNuxtApp();

      try {
        const [users, permissions, log_user_per] = await Promise.all([
          $api("/user/"),
          $api("/user/authentication_permissions/"),
          $api("/user/login_user_permissions/"),
        ]);

        this.userList = users;
        this.permissions = permissions.permissions;
        this.userPermissions = log_user_per.user_permissions;
      } catch (err) {
        console.error("Error fetching data:", err);
        this.error = "Failed to fetch user data";
      } finally {
        this.loading = false;
      }
    },
  },
});
