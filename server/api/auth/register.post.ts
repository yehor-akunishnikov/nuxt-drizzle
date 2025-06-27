export default defineEventHandler(async (event) => {
  const registerPayload: RegisterPayload = await readValidatedBody(event, registerValidator.parse);
  const password = await hashPassword(registerPayload.password);

  try {
    await useDrizzle().insert(tables.userSchema).values({ ...registerPayload, password });
  }
  catch (e) {
    if (isPostgresError(e) && e.code === "23505") throw createConflictError("Such user already exists.");

    throw createInternalServerError();
  }

  return { message: "Successfully registered!" };
});
