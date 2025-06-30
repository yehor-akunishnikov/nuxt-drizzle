export default defineEventHandler(async (event) => {
  const repo = await useProtectedRepo(event, UserProtectedRepo);
  const user = await repo.findMe();

  return userMeDto(user);
});
