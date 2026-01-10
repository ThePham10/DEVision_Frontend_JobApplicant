import { ChangePasswordBox, PersonalBox } from "@/components/account-box";
import { AuthGuard } from "@/components/reusable-component";

export default function Page() {
    return (
        <AuthGuard>
            <div className="flex flex-col gap-4 mt-4 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 pb-8">
                <div className="text-2xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-8">Account Setting</div>
                <PersonalBox />
                <ChangePasswordBox />
            </div>
        </AuthGuard>
    )
}