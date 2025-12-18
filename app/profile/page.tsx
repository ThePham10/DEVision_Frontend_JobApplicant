import Header from "@/components/header/ui/header";
import AvatarBox from "@/components/profile-box/avatar-box/AvatarBox";
import { SummaryTable } from "@/components/profile-box/summary-table/ui/SummaryTable";

export default function Page() {
    return (
        <>
            <Header />

            <div className="flex flex-col gap-4 mt-4 ml-40 mr-40">
                <div className="text-3xl font-bold text-foreground mb-8">Profile Management</div>
                <AvatarBox />
                <SummaryTable />
            </div>

        </>
    )
}