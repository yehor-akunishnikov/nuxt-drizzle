declare module "#auth-utils" {
  interface User {
    id: number;
    name: string;
    email: string;
  }
}

export type AuthResponse = {
  message: string;
};

export {};
