import type { UserSelect } from "./drizzle";
import { omit } from "./common";

export function userPublicDto(user: UserSelect) {
  return omit(user, ["password", "createdAt"]);
}

export function userMeDto(user: UserSelect) {
  return omit(user, ["password"]);
}

export type UserPublicDto = ReturnType<typeof userPublicDto>;
export type UserMeDto = ReturnType<typeof userMeDto>;
