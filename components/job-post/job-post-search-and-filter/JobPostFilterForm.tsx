import { HeadlessForm } from "@/components/headless-form/Form";
import type { FormConfig } from "@/components/headless-form/types/types";

const formConfig: FormConfig = {
    children: [
        { name: "jobTitle", title: "Job Title", type: "text", placeholder: "Software Engineer", colSpan: 1 },
        { name: "location", title: "Location", type: "text", placeholder: "Ho Chi Minh", colSpan: 1 },
        { 
            name: "employmentType", 
            title: "Employment Type", 
            type: "select", 
            placeholder: "Select employment type",
            options: [
                { label: "Full-time", value: "full-time" },
                { label: "Part-time", value: "part-time" },
                { label: "Contract", value: "contract" },
                { label: "Internship", value: "internship" },
            ],
            colSpan: 1 
        },
        {
            name: "salaryRange", 
            title: "Salary Range", 
            type: "range", 
            placeholder: "Select salary range",
            colSpan: 1,
            min: 0,
            max: 10000,
            step: 100,
        }
    ],
    buttonText: "Filter",
    layout: {
        type: "grid",
        columns: 4,
        gap: "6",
    },
    buttonClassName: "col-span-4", // Full width button across 3 columns
};  

const JobPOstFilterForm = () => {
    return (
        <HeadlessForm config={formConfig} onSubmit={(data) => console.log(data)}/>
    )
}

export default JobPOstFilterForm