import { defineStore } from "pinia";

export const useTodosStore = defineStore("todos", {
  state: () => ({
    todosList: [],
    loading: true,
    error: null,
  }),

  actions: {
    async fetchTodos() {
      this.loading = true;
      this.error = null;
      const { $api } = useNuxtApp();

      try {
        const todos = await $api("/todos/");
        this.todosList = todos;
      } catch (err) {
        console.error("Error fetching data:", err);
        this.error = "Failed to fetch user data";
      } finally {
        this.loading = false;
      }
    },
  },
});
