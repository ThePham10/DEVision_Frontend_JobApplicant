import { JobPostTable } from "@/components/job-post";


export default function Page() {
    return (
        <div className="flex flex-col gap-4 mt-4 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40">
            <div className="text-2xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-8">Find Your Next Opportunity</div>
            <JobPostTable />
        </div>
    )
}