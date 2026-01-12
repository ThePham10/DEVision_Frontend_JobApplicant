// The data type for send to the server
type RegisterData = {
  name: string;
  email: string;
  password: string;
  country: string;
  phone?: string;
  street?: string;
  city?: string;
}

// The returned data from the server
type UserData = {
    user: User;
}

// The user data type
type User = {
  id: string;
  email: string;
  name: string;
  role: string;
  country: string;
  emailVerified: boolean;
  isPremium: boolean;
}

export type { RegisterData, UserData }