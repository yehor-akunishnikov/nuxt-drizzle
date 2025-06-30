export function userPublicDto(user: UserSelect) {
  return omit(user, ["password", "createdAt"]);
}

export function userMeDto(user: UserSelect) {
  return omit(user, ["password"]);
}

export function fragmentDto(fragment: FragmentSelect) {
  return omit(fragment, ["authorId"]);
}

export type UserPublicDto = ReturnType<typeof userPublicDto>;
export type UserMeDto = ReturnType<typeof userMeDto>;
export type FragmentDto = ReturnType<typeof fragmentDto>;
