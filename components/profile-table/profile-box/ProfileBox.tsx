import React from "react";
import { WorkExperience, Education } from "../types/types"; 

interface ProfileBoxProps {
    title: string;
    items: (WorkExperience | Education)[];
}

const ProfileBox: React.FC<ProfileBoxProps> = ({ title, items }) => {
    return (
        <div className="flex flex-col gap-4"> 
            {items.map((item) => (
                <div key={item.id} className="mb-2">
                    {"jobTitle" in item ? ( 
                        <div className="relative flex flex-col gap-4 border border-gray-200 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="font-[Inter] text-xl font-bold">{item.jobTitle}</h3>
                            <p>
                                Years of Work: {item.startDate} - {item.endDate}
                            </p>
                            <p>Description: {item.jobDescription}</p>
                        </div>
                    ) : ( 
                        <div className="relative flex flex-col gap-4 border border-gray-200 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="font-[Inter] text-lg font-bold">{item.degree}</h3>
                            <p>Major: {item.fieldOfStudy}</p>
                            <p>
                                Years: {item.startYear} - {item.endYear}
                            </p>
                            <p>GPA: {item.gpa}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ProfileBox;