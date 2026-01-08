export type EducationCreationData = {
    schoolName: string;
    levelStudy: string;
    major: string;
    startDate: string;
    endDate: string | null;
    gpa: number;
}

export type Education = {
    id: string,
    applicantId: string,
    levelStudy: string,
    major: string,
    schoolName: string,
    gpa: number,
    startDate: string,
    endDate: string | null,
    skillCategories: [],
    createdAt: string,
    updatedAt: string
}

export type EducationCreateData = {
    levelStudy: string,
    major: string,
    schoolName: string,
    gpa: number,
    startDate: string,
    endDate: string | null,
}