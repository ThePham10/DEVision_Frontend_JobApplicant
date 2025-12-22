import { Profile } from "../types/types";

const ProfileWorkExpCard = ({ item }: { item: Profile }) =>  {
    return (
        <div className="flex flex-col gap-4"> 
            {item.workExperience.map((workExpItem) => (
                <div key={workExpItem.id} className="mb-2">
                    <div className="relative flex flex-col gap-4 border border-gray-200 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="font-[Inter] text-lg font-bold">{workExpItem.jobTitle}</h3>
                        <p>
                            Years of Work: {workExpItem.startDate} - {workExpItem.endDate}
                        </p>
                        <p>Description: {workExpItem.jobDescription}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProfileWorkExpCard;