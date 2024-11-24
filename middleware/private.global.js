import { useUserPermissionStore } from "~/stores/userPermissionsStore";

export default defineNuxtRouteMiddleware(async (to) => {
  const { status, data } = useAuth();
  const loggedIn = status.value === "authenticated";
  const userPermissionsStore = useUserPermissionStore();

  if (userPermissionsStore.loading) {
    await userPermissionsStore.fetchUserPermissions();
  }

  const hasPermission = (action) => {
    const permissions = userPermissionsStore.userPermissionsList || [];
    return permissions.some((perm) => perm.name === `todos.${action}_todos`);
  };

  const routes = {
    guestOnly: ["/login", "/signup"],
    protected: {
      "/todos/add": hasPermission("add"),
      "/todos/edit": hasPermission("change"),
      "/todos/list": hasPermission("view"),
      "/todos/delete": hasPermission("delete"),
    },
  };

  if (loggedIn) {
    // Redirect from guest-only routes if logged in
    if (routes.guestOnly.includes(to.path)) return navigateTo("/");

    // Redirect to home if user is not admin and tries to access dashboard
    if (to.path === "/dashboard" && data.value.user?.role !== "admin")
      return navigateTo("/");

    // Redirect to home if the user does not have the required permission for a protected route
    if (to.path in routes.protected && !routes.protected[to.path])
      return navigateTo("/");
  } else {
    // Redirect to login page if not logged in and trying to access non-guest routes
    if (!routes.guestOnly.includes(to.path)) {
      return navigateTo("/login");
    }
  }
});
