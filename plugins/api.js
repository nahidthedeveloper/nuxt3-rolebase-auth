export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();

    const apii = $fetch.create({
        baseURL: process.server ? config.apiBaseUrl : config.public.apiBaseUrl,
        onRequest({ request, options }) {

            options.method = options.method || "GET";
            const head = useRequestHeaders(["cookie"]);

            return nuxtApp.runWithContext(async () => {
                const { data: session } = await useFetch("/api/token", { headers: head });
                const token = session?.value?.token;

                if (token) {
                    options.headers = {
                        ...(options.headers || {}),
                        Authorization: `Bearer ${token}`,
                    };
                }
            });
        },
        async onResponseError({ response }) {
            if (response.status === 401) {
                await nuxtApp.runWithContext(() => navigateTo("/login"));
            }
        },
    });

    return {
        provide: {
            apii,
        },
    };
});
