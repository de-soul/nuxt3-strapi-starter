import { useSnackbarStore } from "~/stores/useSnackbarStore";
const {
  find: _find,
  delete: _delete,
  create: _create,
  update: _update,
} = useStrapi();
const snackbar = useSnackbarStore();
export const useSqlManagerStore = defineStore("sqlManager", {
  state: () => ({
    datasets: {},
  }),
  getters: {
    items: (state) => (collection) => state.datasets[collection] || [],
  },
  actions: {
    async find(collection) {
      try {
        const { data } = await _find(collection);
        this.datasets[collection] = {};
        this.datasets[collection] = data;
        return true;
      } catch (e) {
        console.log(`Error get records from collection ${collection}`);
        console.log(e);
        return false;
      }
    },
    async delete(collection, id) {
      try {
        await _delete(collection, id);
        return true;
      } catch (e) {
        console.log(`Error deleting id ${id} from collection ${collection}`);
        console.log(e);
        return false;
      }
    },
    async bulkDelete(collection, ids) {
      for (const id of ids) {
        try {
          await _delete(collection, id);
        } catch (e) {
          console.log(`Error deleting id ${id} from collection ${collection}`);
          console.log(e);
          return false;
        }
      }
      await snackbar.setSnackbar({
        show: true,
        color: "green-darken-2",
        title: `Success`,
        message: `Deleted ids: ${ids.join(", ")}`,
      });
      // await this.find(collection);
      return true;
    },
    async add(collection, payload) {
      try {
        await _create(collection, payload);
        await snackbar.setSnackbar({
          show: true,
          color: "green-darken-2",
          title: `Success`,
          message: `Added new element to collection: ${collection}`,
        });
        return true;
      } catch (e) {
        console.log(
          `Error adding new element to collection ${collection} with payload ${payload}`
        );
        console.log(e);
        return false;
      }
    },
    async update(collection, id, payload) {
      try {
        await _update(collection, id, payload);
        await snackbar.setSnackbar({
          show: true,
          color: "green-darken-2",
          title: `Success`,
          message: `Element id ${id} updated in collection ${collection}`,
        });
        return true;
      } catch (e) {
        console.log(
          `Error updating element id ${id} to collection ${collection}`
        );
        console.log(e);
        return false;
      }
    },
  },
});
