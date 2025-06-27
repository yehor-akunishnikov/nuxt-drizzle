export default defineEventHandler(async (event) => {
  const loginPayload: LoginPayload = await readValidatedBody(event, prettyPrintError(loginValidator));
  const repo = useRepo(event, UserPublicRepo);

  const user = await repo.findOneByEmail(loginPayload.email);

  if (user) {
    const isVerified = await verifyPassword(user.password, loginPayload.password);

    if (isVerified) {
      await setUserSession(event, {
        user: pick(user, ["id", "name", "email"]),
        loggedInAt: Date.now(),
      });

      return { message: "Successful login!" };
    }
  }

  throw createUnauthorizedError("Failed to login.");
});
