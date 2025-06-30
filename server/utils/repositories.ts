import type { H3Event } from "h3";
import type { FragmentInsert } from "./drizzle";

class Repo {
  constructor(
    protected readonly drizzle: DrizzleInstance,
  ) {
  }
}

class ProtectedRepo {
  constructor(
    protected readonly drizzle: DrizzleInstance,
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

  public async insert(payload: UserInsert): Promise<void> {
    await this.drizzle.insert(tables.userSchema).values({ ...payload });
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

export class FragmentRepo extends ProtectedRepo {
  public async create(
    payload: Omit<FragmentInsert, "authorId" | "createdAt" | "updatedAt">,
  ): Promise<FragmentSelect> {
    return this.drizzle
      .insert(tables.fragmentSchema)
      .values({ ...payload, authorId: this.userId })
      .returning()
      .then(fragments => fragments[0]);
  }

  public async findAll(): Promise<FragmentSelect[]> {
    return this.drizzle
      .select()
      .from(tables.fragmentSchema)
      .where(eq(tables.fragmentSchema.authorId, this.userId));
  }

  public async findOneById(id: number): Promise<FragmentSelect> {
    return this.drizzle
      .select()
      .from(tables.fragmentSchema)
      .where(
        and(
          eq(tables.fragmentSchema.authorId, this.userId),
          eq(tables.fragmentSchema.id, id),
        ),
      )
      .then(fragments => fragments[0]);
  }

  public async update(
    id: number,
    payload: Omit<FragmentInsert, "authorId" | "createdAt" | "updatedAt">,
  ): Promise<FragmentSelect> {
    return this.drizzle
      .update(tables.fragmentSchema)
      .set({ ...payload, updatedAt: new Date() })
      .where(
        and(
          eq(tables.fragmentSchema.authorId, this.userId),
          eq(tables.fragmentSchema.id, id),
        ),
      )
      .returning()
      .then(fragments => fragments[0]);
  }

  public async delete(id: number): Promise<FragmentSelect> {
    return this.drizzle
      .delete(tables.fragmentSchema)
      .where(
        and(
          eq(tables.fragmentSchema.authorId, this.userId),
          eq(tables.fragmentSchema.id, id),
        ),
      )
      .returning()
      .then(fragments => fragments[0]);
  }
}
