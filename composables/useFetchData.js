export default function useFetchData(url, options = {}) {
    const config = useRuntimeConfig();

    return async () => {
        const head = useRequestHeaders(["cookie"]);

        const {data: session} = await useFetch("/api/token", {headers: head});
        const token = session?.value?.token;

        const headers = {
            ...(options.headers || {}),
            ...(token ? {Authorization: `Bearer ${token}`} : {}),
        };

        const {data, error} = await useFetch(url, {
            baseURL: process.server ? config.apiBaseUrl : config.public.apiBaseUrl,
            method: options.method || "GET",
            params: options.params || {},
            body: options.body || null,
            headers,
        });

        if (error.value) {
            console.error("Error fetching data:", error.value);
            throw error.value;
        }

        return data.value;
    };
}


// ================================================================================
// Client-Side Example
// ================================================================================
{
    /* <script setup>
  import { useFetchData } from '~/composables/useFetchData';
  import { ref, onMounted } from 'vue';

  const clientData = ref(null);
  const error = ref(null);

  const fetchClientData = async () => {
    try {
      clientData.value = await useFetchData('/protected/resource');
    } catch (err) {
      error.value = err;
    }
  };

  onMounted(fetchClientData);
  </script> */
}

// ================================================================================
// Server-side Example
// ================================================================================

{
    /* <script setup>
  import { useFetchData } from '~/composables/useFetchData';
  const { data: users, pending, error, refresh } = await useAsyncData('users', () =>
    useFetchData('/user/',{
      // method: 'POST',
      // body: {
      //   name: 'John Doe',
      //   email: 'johndoe@example.com',
      // },
    })
  );
  </script> */
}
