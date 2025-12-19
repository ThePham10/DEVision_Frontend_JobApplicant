"use client";

import AvatarBox from "./profile-box/AvatarBox";
import SkillBox from "./profile-box/SkillBox";
import { SummaryForm } from "./profile-forms/SummaryForm";
import { mockProfile } from "./Data";
import ProfileBox from "./profile-box/ProfileBox";

export const ProfileTable = () => {
    return (
        <div className="flex flex-col gap-4 mt-4 mb-8" >
            <AvatarBox />
            
            <div className="flex flex-col gap-4 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="mb-6">
                    <div className="font-[Inter] text-3xl font-bold mb-4">
                        Objective Summary
                    </div>

                    <SummaryForm />

                </div>
            </div>

            <div className="flex flex-col gap-4 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="mb-6">
                    <div className="font-[Inter] text-3xl font-bold mb-4">
                        Technical Skill
                    </div>
                    <SkillBox item={mockProfile[0]} />
                </div>
            </div>

            <div className="flex flex-col gap-4 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="mb-6">
                    <div className="font-[Inter] text-3xl font-bold mb-4">
                        Education
                    </div>
                    

                    <ProfileBox title="Education" items={mockProfile[0].education} />
                </div>
            </div>

            <div className="flex flex-col gap-4 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="mb-6">
                    <div className="font-[Inter] text-3xl font-bold mb-4">
                        Work Experience
                    </div>

                    <ProfileBox title="Work Experience" items={mockProfile[0].workExperience} />
                </div>
            </div>

        </div>
    )
}