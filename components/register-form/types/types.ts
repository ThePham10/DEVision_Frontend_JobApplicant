type RegisterData = {
  name: string;
  email: string;
  password: string;
  country: string;
  phone?: string;
  street?: string;
  city?: string;
}

type registerUserWithGoogleAccountData = {
    idToken: string;
}

// Define the expected user data from the API
type UserData = {
    id: string;
    email: string;
    name: string;
    role: string;
    country: string;
    emailVerified: boolean;
}

export type {RegisterData, UserData, registerUserWithGoogleAccountData}