export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();

    const api = $fetch.create({
        baseURL: process.server ? config.apiBaseUrl : config.public.apiBaseUrl,
        onRequest: async ({request, options}) => {
            options.method = options.method || "GET";
            const headers = useRequestHeaders(["cookie"]);

            const session = await $fetch("/api/token", {
                headers,
            });
            const token = session?.token;

            if (token) {
                options.headers = {
                    ...(options.headers || {}),
                    Authorization: `Bearer ${token}`,
                };
            }
        },
        onResponseError: async ({response}) => {
            if (response.status === 401) {
                await nuxtApp.runWithContext(() => navigateTo("/login"));
            }
        },
    });

    return {
        provide: {
            api,
        },
    };
});
