import Header from "@/components/header/ui/header";
import { PersonalBox } from "@/components/account-box/personal-box/ui/PersonalBox";
import { ChangePasswordBox } from "@/components/account-box/change-password-box/ui/ChangePasswordBox";

export default function Page() {
    return (
        <>
            <Header />

            <div className="flex flex-col gap-4 mt-4 ml-40 mr-40">
                <div className="text-3xl font-bold text-foreground mb-8">Account Setting</div>
                <PersonalBox />
                <ChangePasswordBox />
            </div>

        </>
    )
}