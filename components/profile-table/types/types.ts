type Profile = {
    summary: string;
    skills: Skill[];
    education: Education[];
    workExperience: WorkExperience[];
}

type Skill = {
    id: string;
    name: string;
    icon?: string; // Lucide icon name
}

type Education = {
    id: string;
    degree: string;
    school: string;
    fieldOfStudy: string;
    startYear: string;
    endYear: string;
    gpa: string;
};

type WorkExperience = {
    id: string;
    jobTitle: string;
    startDate: string;
    endDate: string;
    jobDescription: string;
};

export type { Education, WorkExperience, Skill, Profile };