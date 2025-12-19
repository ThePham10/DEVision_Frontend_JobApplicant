import { Profile } from "../types/types";
import Badge from "@/components/reusable-component/Badge";

const ProfileSkillCard = ({ item }: { item: Profile }) => {
    
    return (
        <div className="flex flex-wrap gap-2">
            {item.skills.map((skill, index) => (
                <Badge key={index} text={skill.name} />
            ))}
        </div>
        
    )
}

export default ProfileSkillCard;