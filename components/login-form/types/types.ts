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
  isPremium: boolean;
}

type UserData = {
    user: User;
}

type UserProfile = {
  name: string;
  email: string;
  phone: string;
  country: string;
  street: string;
  city: string;
  emailVerified: boolean;
  objectiveSummary: string;
  isPremium: boolean;
  avatarUrl: string;
  isActive: boolean;
  skillCategories: string[];
  highestEducation: string;
}

export type { LoginData, UserData, User, UserProfile };
