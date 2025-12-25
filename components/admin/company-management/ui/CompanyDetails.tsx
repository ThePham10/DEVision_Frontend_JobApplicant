import { Company } from "../types";
import { Building, Mail, MapPinHouse, SearchSlash, BriefcaseBusiness} from "lucide-react";

interface CompanyDetailProps {
    company: Company;
}

const CompanyDetails = ({ company }: CompanyDetailProps) => {
    return (
        <div className="flex flex-col gap-5">
            {/* Header: Title + Employment Type Badge */}
            <div className="flex items-center justify-between jobs-start">
                <div>
                    <div className="flex items-center gap-3">
                        <Building className="w-6 h-6 text-gray-700 flex-shrink-0" />
                        <h3 className="text-3xl font-bold text-gray-900 m-0">{company.name}</h3>
                    </div>

                    <div className="flex items-center gap-2 text-xl text-[#65758B] mt-3">
                        <Mail className="w-5 h-5 text-[#65758B] flex-shrink-0" />
                        <span>{company.email}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xl text-[#65758B] mt-1">
                        <MapPinHouse className="w-5 h-5 text-[#65758B] flex-shrink-0" />
                        <span>{company.address}</span>
                    </div>

                    {company.field && (
                    <div className="flex items-center gap-2 text-xl text-[#65758B] mt-1">
                        <BriefcaseBusiness className="w-5 h-5 text-[#65758B] flex-shrink-0" />
                        <span>Field: {company.field}</span>
                    </div>
                    )}

                </div>

            </div>
            {company.description && (
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <SearchSlash className="w-5 h-5 flex-shrink-0" />
                        <span className="text-2xl font-bold">About this company</span>
                    </div>
                    <span className="text-justify whitespace-pre-line">{company.description}</span>
                </div>
            )}
        </div>
    )
}


export default CompanyDetails;