"use client";

import AvatarBox from "./profile-box/AvatarBox";
import ProfileSkillBox from "./profile-box/ProfileSkillBox";
import ProfileEducationBox from "./profile-box/ProfileEducationBox";
import ProfileWorkExpBox from "./profile-box/ProfileWorkExpBox";
import SummaryBox from "./profile-box/SummaryBox";

export const ProfileTable = () => {
    return (
        <div className="flex flex-col gap-4 mt-4 mb-8" >
            <AvatarBox />
            
            <SummaryBox />

            <ProfileSkillBox /> 

            <ProfileEducationBox />

            <ProfileWorkExpBox />

        </div>
    )
}