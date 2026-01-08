type WorkExpData = {
    id: string;
    title: string;
    applicantId: string;
    companyId: string;
    description: string;
    startDate: string;
    endDate: string;
    skillCategories: string[];
}

type SkillsFromWorkExp = {
    id: string;
    name: string;
    icons: string;
}

export type { WorkExpData, SkillsFromWorkExp };