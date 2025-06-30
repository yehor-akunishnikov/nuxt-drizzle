export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));

  if (isNaN(id)) throw createBadRequestError("Invalid id.");

  const repo = await useProtectedRepo(event, FragmentRepo);
  const data = await repo.findOneById(id);

  if (!data) throw createNotFoundError();

  return fragmentDto(data);
});
