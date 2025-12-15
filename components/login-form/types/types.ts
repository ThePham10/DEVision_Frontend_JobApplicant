type LoginData = {
  email: string;
  password: string;
}

type UserData = {
    id: string;
    email: string;
    name: string;
    role: string;
    country: string;
    emailVerified: boolean;
}

export type { LoginData, UserData }