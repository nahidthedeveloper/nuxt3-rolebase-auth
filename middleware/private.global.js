import { useUserPermissionStore } from "~/stores/userPermissionsStore";

export default defineNuxtRouteMiddleware((to) => {
  const { status, data } = useAuth();
  const loggedIn = status.value === "authenticated";
  const userPermissionsStore = useUserPermissionStore();

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
    if (routes.guestOnly.includes(to.path)) return navigateTo("/");
    if (to.path === "/dashboard" && data.value.user?.role !== "admin")
      return navigateTo("/");
    if (to.path in routes.protected && !routes.protected[to.path])
      return navigateTo("/");
  } else if (!routes.guestOnly.includes(to.path)) {
    return navigateTo("/login");
  }
});
