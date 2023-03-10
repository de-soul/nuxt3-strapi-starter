export const useSnackbarStore = defineStore("snackbar", {
  state: () => ({
    show: false,
    color: "",
    title: "",
    message: "",
    timeout: 10000,
  }),
  getters: {
    snackbar: (state) => state,
  },
  actions: {
    setSnackbar(newOptions) {
      this.show = newOptions["show"] || false;
      this.color = newOptions["color"] || "";
      this.title = newOptions["title"] || "";
      this.message = newOptions["message"] || "";
      this.timeout = newOptions["timeout"] || 10000;
    },
    clearSnackbar() {
      this.show = false;
    },
  },
});
