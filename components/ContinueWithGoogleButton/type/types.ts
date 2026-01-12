// Define the data get for Google authentication
type authUserWithGoogleAccountData = {
    idToken: string;
}

// Define the User data type returned from API
type UserData = {
    id: string;
    email: string;
    name: string;
    avatarUrl: string;
    role: string;
    country: string;
    emailVerified: boolean;
}

export type { authUserWithGoogleAccountData, UserData }