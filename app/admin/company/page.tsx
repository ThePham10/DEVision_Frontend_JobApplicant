import Header from "@/components/header/ui/header";
import { AuthGuard } from "@/components/auth-guard/authGuard";
import CompanyManagement from "@/components/admin/company-management/ui/CompanyManagement";

export default function Page() {
    return (
        <AuthGuard role="admin">
            <Header />
            <div className="flex flex-col gap-4 mt-4 mx-4 sm:mx-10 lg:mx-40">
            <CompanyManagement />
            </div>
        </AuthGuard>
    );
}