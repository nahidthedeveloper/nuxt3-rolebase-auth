export default defineNuxtRouteMiddleware((to, from) => {
  const { status } = useAuth();
  const loggedIn = status.value === "authenticated";

  const guestOnlyRoutes = ["/login", "/signup"];

  if (loggedIn) {
    if (guestOnlyRoutes.includes(to.path)) {
      return navigateTo("/");
    }
  } else {
    if (!guestOnlyRoutes.includes(to.path)) {
      return navigateTo("/login");
    }
  }
});
