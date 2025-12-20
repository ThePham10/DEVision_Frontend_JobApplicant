import Header from "@/components/header/ui/header";
import { AuthGuard } from "@/components/auth-guard/authGuard";
import ApplicantManagement from "@/components/admin/applicant-management/ui/ApplicantManagement";

export default function Page() {
    return (
        <AuthGuard role="admin">
            <Header />
            <div className="flex flex-col gap-4 mt-4 mx-4 sm:mx-10 lg:mx-40">
                <ApplicantManagement />
            </div>
        </AuthGuard>
    );
}