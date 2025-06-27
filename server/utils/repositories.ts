import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import type { H3Event } from "h3";

class Repo {
  constructor(
    protected readonly drizzle: NodePgDatabase<typeof tables> & { $client: string },
  ) {
  }
}

class ProtectedRepo {
  constructor(
    protected readonly drizzle: NodePgDatabase<typeof tables> & { $client: string },
    protected readonly userId: number,
  ) {
  }
}

export function useRepo<R extends typeof Repo>(
  event: H3Event,
  repoClass: R,
): InstanceType<R> {
  const drizzle = useDrizzle(event);

  return new repoClass(drizzle) as InstanceType<R>;
}

export async function useProtectedRepo<R extends typeof ProtectedRepo>(
  event: H3Event,
  repoClass: R,
): Promise<InstanceType<R>> {
  const drizzle = useDrizzle(event);
  const session = await requireUserSession(event);

  return new repoClass(drizzle, Number(session.user.id)) as InstanceType<R>;
}

export class UserPublicRepo extends Repo {
  public async findOneByEmail(email: string): Promise<UserSelect | undefined> {
    return this.drizzle
      .select()
      .from(tables.userSchema)
      .where(eq(tables.userSchema.email, email))
      .then(users => users[0]);
  }

  public async insert(registerPayload: RegisterPayload): Promise<void> {
    await this.drizzle.insert(tables.userSchema).values({ ...registerPayload });
  }
}

export class UserProtectedRepo extends ProtectedRepo {
  public async findMe(): Promise<UserSelect> {
    return this.drizzle
      .select()
      .from(tables.userSchema)
      .where(eq(tables.userSchema.id, this.userId))
      .then(users => users[0]);
  }
}
