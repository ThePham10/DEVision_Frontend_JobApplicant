import Header from "@/components/header/ui/header";
import JobPostTable from "@/components/job-post/job-post-table/ui/JobPostTable";


export default function Page() {
    return (
        <>
            <Header />

            <div className="flex flex-col gap-4 mt-4 ml-40 mr-40">
                <div className="text-3xl font-bold text-foreground mb-8">Find Your Next Opportunity</div>
                <JobPostTable />
            </div>
        </>
    )
}