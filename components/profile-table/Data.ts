import { Profile } from "./types/types";

export const mockProfile: Profile[] = [
    {
        summary: "Aspiring software engineer with a passion for developing innovative programs that expedite the efficiency and effectiveness of organizational success.",
        skills: [
            { id: "s1", name: "SpringBoot" },
            { id: "s2", name: "React" },
            { id: "s3", name: "Next.js" },
            { id: "s4", name: "JavaScript" },
            { id: "s5", name: "Presentation" },
            { id: "s6", name: "Networking" },
            { id: "s7", name: "Negotiation" },
            { id: "s8", name: "Communication" },
        ],
        education: [
            {
                id: "e1",
                degree: "Bachelor (Honours)",
                fieldOfStudy: "Software Engineering",
                startYear: "2022",
                endYear: "2025",
                gpa: "3.5",
            },
            {
                id: "e2",
                degree: "Bachelor",
                fieldOfStudy: "Human Resource Management",
                startYear: "2018",
                endYear: "2022",
                gpa: "3.2",
            },
        ],
        workExperience: [
            {
                id: "w1",
                jobTitle: "Intern Software Developer",
                startDate: "June 2023",
                endDate: "August 2023",
                jobDescription: "Assisted in the development of web applications using React",
            }, {
                id: "w2",
                jobTitle: "Lead HR Coordinator",
                startDate: "Jun 2020",
                endDate: "December 2022",
                jobDescription: "Managed recruitment and onboarding processes for new employees.",
            }
        ],
    }
]
