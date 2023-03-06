export function useStrapiHelpers() {
  const systemFields = ref([
    { name: "id", icon: "mdi-identifier", type: "number" },
    { name: "createdAt", icon: "mdi-clock-start", type: "datetime" },
    { name: "updatedAt", icon: "mdi-clock-end", type: "datetime" },
  ]);
  const flatResponse = (response) =>
    response.map((r) => ({ id: r.id, ...r.attributes }));
  return { flatResponse, systemFields };
}
