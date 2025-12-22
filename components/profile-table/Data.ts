import { Profile } from "./types/types";

export const mockProfile: Profile[] = [
    {
        summary: "Aspiring software engineer with a passion for developing innovative programs that expedite the efficiency and effectiveness of organizational success.",
        skills: [
            { id: "s1", name: "SpringBoot", icon: "Leaf" },
            { id: "s2", name: "React", icon: "Atom" },
            { id: "s3", name: "Next.js", icon: "Triangle" },
            { id: "s4", name: "JavaScript", icon: "FileCode" },
            { id: "s5", name: "Presentation", icon: "Presentation" },
            { id: "s6", name: "Networking", icon: "Network" },
            { id: "s7", name: "Negotiation", icon: "Handshake" },
            { id: "s8", name: "Communication", icon: "MessageCircle" },
        ],
        education: [
            {
                id: "e1",
                degree: "Bachelor (Honours)",
                school: "RMIT University",
                fieldOfStudy: "Software Engineering",
                startYear: "2022",
                endYear: "2025",
                gpa: "3.5",
            },
            {
                id: "e2",
                degree: "Master",
                school: " University of Science Ho Chi Minh City",
                fieldOfStudy: "Computer Science",
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
                jobTitle: "Frontend Test Engineer",
                startDate: "2020",
                endDate: "2022",
                jobDescription: "Conducted testing and quality assurance for frontend applications",
            }
        ],
    }
]
