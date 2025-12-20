import { httpHelper } from "@/utils/httpHelper";
import { Skill, SkillFilters, PaginatedResponse, JobCategory } from "../types";
import { SKILL_URL } from "@/config/URLConfig";

// Mock job categories data
const mockJobCategories: JobCategory[] = [
    { id: "cat-1", name: "Frontend", description: "Frontend development skills", isActive: true },
    { id: "cat-2", name: "Backend", description: "Backend development skills", isActive: true },
    { id: "cat-3", name: "Mobile", description: "Mobile development skills", isActive: true },
    { id: "cat-4", name: "DevOps", description: "DevOps and infrastructure skills", isActive: true },
    { id: "cat-5", name: "Database", description: "Database management skills", isActive: true },
    { id: "cat-6", name: "Cloud", description: "Cloud platform skills", isActive: true },
    { id: "cat-7", name: "AI/ML", description: "Artificial Intelligence and Machine Learning", isActive: true },
    { id: "cat-8", name: "Testing", description: "Quality assurance and testing", isActive: true },
    { id: "cat-9", name: "Security", description: "Cybersecurity skills", isActive: true },
    { id: "cat-10", name: "Other", description: "Other technical skills", isActive: true },
];

// Mock data for development
let mockSkills: Skill[] = [
    { id: "1", name: "React", jobCategoryId: "cat-1", description: "React.js library", isActive: true, createdAt: new Date("2024-01-01T10:00:00Z"), updatedAt: new Date("2024-01-01T10:00:00Z") },
    { id: "2", name: "Node.js", jobCategoryId: "cat-2", description: "Node.js runtime", isActive: true, createdAt: new Date("2024-01-02T11:00:00Z"), updatedAt: new Date("2024-01-02T11:00:00Z") },
    { id: "3", name: "TypeScript", jobCategoryId: "cat-1", description: "TypeScript language", isActive: true, createdAt: new Date("2024-01-03T12:00:00Z"), updatedAt: new Date("2024-01-03T12:00:00Z") },
    { id: "4", name: "Python", jobCategoryId: "cat-2", description: "Python programming", isActive: true, createdAt: new Date("2024-01-04T13:00:00Z"), updatedAt: new Date("2024-01-04T13:00:00Z") },
    { id: "5", name: "Docker", jobCategoryId: "cat-4", description: "Docker containerization", isActive: true, createdAt: new Date("2024-01-05T14:00:00Z"), updatedAt: new Date("2024-01-05T14:00:00Z") },
    { id: "6", name: "PostgreSQL", jobCategoryId: "cat-5", description: "PostgreSQL database", isActive: true, createdAt: new Date("2024-01-06T15:00:00Z"), updatedAt: new Date("2024-01-06T15:00:00Z") },
    { id: "7", name: "AWS", jobCategoryId: "cat-6", description: "Amazon Web Services", isActive: true, createdAt: new Date("2024-01-07T16:00:00Z"), updatedAt: new Date("2024-01-07T16:00:00Z") },
    { id: "8", name: "React Native", jobCategoryId: "cat-3", description: "React Native mobile", isActive: true, createdAt: new Date("2024-01-08T17:00:00Z"), updatedAt: new Date("2024-01-08T17:00:00Z") },
    { id: "9", name: "TensorFlow", jobCategoryId: "cat-7", description: "TensorFlow ML framework", isActive: true, createdAt: new Date("2024-01-09T18:00:00Z"), updatedAt: new Date("2024-01-09T18:00:00Z") },
    { id: "10", name: "Jest", jobCategoryId: "cat-8", description: "Jest testing framework", isActive: true, createdAt: new Date("2024-01-10T19:00:00Z"), updatedAt: new Date("2024-01-10T19:00:00Z") },
    { id: "11", name: "Vue.js", jobCategoryId: "cat-1", description: "Vue.js framework", isActive: true, createdAt: new Date("2024-01-11T20:00:00Z"), updatedAt: new Date("2024-01-11T20:00:00Z") },
    { id: "12", name: "Java Spring Boot", jobCategoryId: "cat-2", description: "Spring Boot framework", isActive: true, createdAt: new Date("2024-01-12T21:00:00Z"), updatedAt: new Date("2024-01-12T21:00:00Z") },
];

/**
 * Load job categories
 */
async function loadJobCategories(): Promise<JobCategory[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockJobCategories.filter(cat => cat.isActive);
}

/**
 * Get category by ID
 */
function getCategoryById(categoryId: string): JobCategory | undefined {
    return mockJobCategories.find(cat => cat.id === categoryId);
}

/**
 * Load skills with pagination and filtering
 */
async function loadSkills(
    page: number,
    limit: number,
    filters?: SkillFilters
): Promise<PaginatedResponse<Skill>> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const response = await httpHelper.get<PaginatedResponse<Skill>>(SKILL_URL);
    
    if (response.status === 200) {
        let filteredItems = response.data.data; 
    
        if (filters) {
            if (filters.name) {
                const searchTerm = filters.name.toLowerCase();
                filteredItems = filteredItems.filter(skill =>
                    skill.name.toLowerCase().includes(searchTerm)
                );
            }
            
            if (filters.jobCategoryId) {
                filteredItems = filteredItems.filter(skill =>
                    skill.jobCategoryId === filters.jobCategoryId
                );
            }
        }
        
        // Sort by createdAt descending (newest first)
        filteredItems.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        
        const startIndex = (page - 1) * limit;
        const paginatedItems = filteredItems.slice(startIndex, startIndex + limit);
        
        return {
            data: paginatedItems,
            total: filteredItems.length,
            page,
            limit,
            hasMore: startIndex + limit < filteredItems.length
        };
    } else {
        return {
            data: [],
            total: 0,
            page,
            limit,
            hasMore: false
        };
    }
}

/**
 * Create a new skill
 */
async function createSkill(skill: Omit<Skill, "id" | "createdAt" | "updatedAt">): Promise<Skill> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const now = new Date();
    const newSkill: Skill = {
        id: Date.now().toString(),
        name: skill.name,
        jobCategoryId: skill.jobCategoryId,
        description: skill.description,
        icon: skill.icon,
        createdBy: skill.createdBy,
        isActive: skill.isActive,
        createdAt: now,
        updatedAt: now
    };
    
    mockSkills = [newSkill, ...mockSkills];
    return newSkill;
}

/**
 * Update an existing skill
 */
async function updateSkill(id: string, updates: Partial<Omit<Skill, "id" | "createdAt">>): Promise<Skill | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const index = mockSkills.findIndex(s => s.id === id);
    if (index === -1) return null;
    
    mockSkills[index] = { 
        ...mockSkills[index], 
        ...updates,
        updatedAt: new Date()
    };
    return mockSkills[index];
}

/**
 * Delete a skill
 */
async function deleteSkill(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const index = mockSkills.findIndex(s => s.id === id);
    if (index === -1) return false;
    
    mockSkills.splice(index, 1);
    return true;
}

export { loadSkills, createSkill, updateSkill, deleteSkill, loadJobCategories, getCategoryById };
