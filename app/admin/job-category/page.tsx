import { AuthGuard } from "@/components/reusable-component";
import { JobCategoryManagement } from "@/components/admin";

export default function Page() {
    return (
        <AuthGuard role="admin">
            <div className="flex flex-col gap-4 mt-4 mx-4 sm:mx-10 lg:mx-40">
                <JobCategoryManagement />
            </div>
        </AuthGuard>
    );
}