export default defineEventHandler(async (event) => {
  const createFragmentPayload: CreateFragmentPayload = await readValidatedBody(event, createFragmentValidator.parse);

  const repo = await useProtectedRepo(event, FragmentRepo);
  const data = await repo.create(createFragmentPayload);

  return fragmentDto(data);
});
