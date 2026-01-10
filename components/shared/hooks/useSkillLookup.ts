import { useQuery } from "@tanstack/react-query";
import { loadSkills } from "@/components/admin/skill-management/service/SkillService";
import { Skill } from "@/components/admin/skill-management/types";

/**
 * Hook to fetch all skills and provide a lookup function
 * to convert skill IDs to skill names
 */
export function useSkillLookup() {
    // Fetch all skills (with a high limit to get all)
    const { data: skillsData, isLoading } = useQuery({
        queryKey: ["all-skills"],
        queryFn: () => loadSkills(1, 1000), // Fetch up to 1000 skills
        staleTime: 10 * 60 * 1000, // Cache for 10 minutes
    });

    const skills = skillsData?.data ?? [];

    // Create a map from skill ID to skill for quick lookup
    const skillMap = new Map<string, Skill>(
        skills.map(skill => [skill.id, skill])
    );

    /**
     * Get skill name by ID
     * Returns the skill name if found, otherwise returns the ID itself
     */
    const getSkillName = (skillId: string): string => {
        return skillMap.get(skillId)?.name ?? skillId;
    };

    /**
     * Get full skill object by ID
     */
    const getSkill = (skillId: string): Skill | undefined => {
        return skillMap.get(skillId);
    };

    /**
     * Convert array of skill IDs to array of skill names
     */
    const getSkillNames = (skillIds: string[]): string[] => {
        return skillIds.map(id => getSkillName(id));
    };

    const getSkillIcon = (skillId: string): string => {
        return getSkill(skillId)?.icon ?? ""
    }

    return {
        skills,
        skillMap,
        isLoading,
        getSkillName,
        getSkill,
        getSkillNames,
        getSkillIcon
    };
}
