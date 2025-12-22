import { Profile } from "../types/types";

const ProfileEducationCard = ({ item }: { item: Profile }) =>  {
    return (
        <div className="flex flex-col gap-4"> 
            {item.education.map((educationItem) => (
                <div key={educationItem.id} className="mb-2">
                    <div className="relative flex flex-col gap-4 border border-gray-200 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="font-[Inter] text-lg font-bold">{educationItem.degree} of {educationItem.fieldOfStudy}</h3>
                        <p>School: {educationItem.school}</p>
                        <p>
                            Years: {educationItem.startYear} - {educationItem.endYear}
                        </p>
                        <p>GPA: {educationItem.gpa}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProfileEducationCard;