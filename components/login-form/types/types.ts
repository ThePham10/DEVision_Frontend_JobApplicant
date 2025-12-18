type LoginData = {
  email: string;
  password: string;
}

type User = {
    id: string;
    email: string;
    name: string;
    avatarUrl?: string;
    role: string;
    country?: string;
    emailVerified: boolean;
}

type UserData = {
    user: User;
}

export type { LoginData, UserData, User };