type RegisterData = {
  name: string;
  email: string;
  password: string;
  country: string;
  phone?: string;
  street?: string;
  city?: string;
}

type UserData = {
    user: User;
}

type User = {
  id: string;
    email: string;
    name: string;
    role: string;
    country: string;
    emailVerified: boolean;
}

export type { RegisterData, UserData }