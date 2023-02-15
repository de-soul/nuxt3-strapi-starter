export default function useStrapiResponse() {
  const flattenResponse = (response) =>
    response.map((r) => ({ id: r.id, ...r.attributes }));
  return { flattenResponse };
}
