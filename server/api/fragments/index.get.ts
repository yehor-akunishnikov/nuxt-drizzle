export default defineEventHandler(async (event) => {
  const repo = await useProtectedRepo(event, FragmentRepo);

  const data = await repo.findAll();

  return data.map(fragmentDto);
});
