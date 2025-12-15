type authUserWithGoogleAccountData = {
    idToken: string;
}

type UserData = {
    id: string;
    email: string;
    name: string;
    role: string;
    country: string;
    emailVerified: boolean;
}

export type { authUserWithGoogleAccountData, UserData }