export default defineEventHandler(async (event) => {
  const loginPayload: LoginPayload = await readValidatedBody(event, prettyPrintError(loginValidator));

  const { id, name } = await findUser(loginPayload);

  await setUserSession(event, {
    user: { id, name },
    loggedInAt: Date.now(),
  });

  return { message: "Successful login!" };
});

async function findUser(loginPayload: LoginPayload): Promise<UserSelect> {
  const user = await useDrizzle()
    .select()
    .from(tables.userSchema)
    .where(eq(tables.userSchema.email, loginPayload.email))
    .then(users => users[0]);

  if (!user) throw createUnauthorizedError("Failed to login.");

  const isPasswordMatch = await verifyPassword(user.password, loginPayload.password);

  if (!isPasswordMatch) throw createUnauthorizedError("Failed to login.");

  return user;
}
