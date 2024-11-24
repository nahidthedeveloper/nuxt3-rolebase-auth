import { useUsersStore } from "~/stores/usersStore";

export default defineNuxtRouteMiddleware((to, from) => {
  const { status, data } = useAuth();
  const loggedIn = status.value === "authenticated";
  const usersStore = useUsersStore();

  // const permissions = computed(() => {
  //   const log_user_per = usersStore.userPermissions || [];
  //   return {
  //     add: log_user_per.some((per) => per.id === 49),
  //     update: log_user_per.some((per) => per.id === 50),
  //     delete: log_user_per.some((per) => per.id === 51),
  //     view: log_user_per.some((per) => per.id === 52),
  //   };
  // });

  const guestOnlyRoutes = ["/login", "/signup"];
  // const protectedRoutes = {
  //   "/user/add": permissions.value.add,
  //   "/user/edit": permissions.value.update,
  //   "/user/list": permissions.value.view,
  //   "/user/delete": permissions.value.delete,
  // };

  if (loggedIn) {
    if (guestOnlyRoutes.includes(to.path)) {
      return navigateTo("/");
    }
    if (
      to.path === "/dashboard" &&
      (!data?.value.user || data.value.user.role !== "admin")
    ) {
      return navigateTo("/");
    }

    // if (protectedRoutes[to.path] !== undefined && !protectedRoutes[to.path]) {
    //   return navigateTo("/");
    // }
  } else {
    if (!guestOnlyRoutes.includes(to.path)) {
      return navigateTo("/login");
    }
  }
});
