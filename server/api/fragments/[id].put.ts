export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));

  if (isNaN(id)) throw createBadRequestError("Invalid id.");

  const updateFragmentPayload: UpdateFragmentPayload = await readValidatedBody(event, updateFragmentValidator.parse);

  const repo = await useProtectedRepo(event, FragmentRepo);
  const data = await repo.update(id, updateFragmentPayload);

  if (!data) throw createNotFoundError();

  return fragmentDto(data);
});
