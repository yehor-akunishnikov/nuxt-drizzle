export default defineEventHandler(async (event) => {
  const registerPayload: RegisterPayload = await readValidatedBody(event, registerValidator.parse);
  const repo = useRepo(event, UserPublicRepo);

  const password = await hashPassword(registerPayload.password);

  try {
    await repo.insert({ ...registerPayload, password });
  }
  catch (e) {
    if (isPostgresError(e) && e.cause.code === "23505") {
      throw createConflictError("Such user already exists.");
    }

    throw createInternalServerError();
  }

  return { message: "Successfully registered!" };
});
