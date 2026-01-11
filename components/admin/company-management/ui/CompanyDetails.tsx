import { Company } from "../types";
import { Building, Mail, MapPinHouse, SearchSlash, Phone, Plane} from "lucide-react";

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
                        <h3 className="text-3xl font-bold text-gray-900 m-0">{company.companyName}</h3>
                    </div>

                    <div className="flex items-center gap-2 text-xl text-[#65758B] mt-3">
                        <Mail className="w-5 h-5 text-[#65758B] flex-shrink-0" />
                        <span>{company.email}</span>
                    </div>

                    {company.streetAddress && (
                    <div className="flex items-center gap-2 text-xl text-[#65758B] mt-1">
                        <MapPinHouse className="w-5 h-5 text-[#65758B] flex-shrink-0" />
                        <span>{company.streetAddress}</span>
                    </div>
                    )}

                    {company.country && (
                    <div className="flex items-center gap-2 text-xl text-[#65758B] mt-1">
                        <Plane className="w-5 h-5 text-[#65758B] flex-shrink-0" />
                        <span> {company.country} </span>
                    </div>
                    )}

                    {company.phoneNumber && (
                    <div className="flex items-center gap-2 text-xl text-[#65758B] mt-1">
                        <Phone className="w-5 h-5 text-[#65758B] flex-shrink-0" />
                        <span> {company.phoneNumber} </span>
                    </div>
                    )}

                </div>

            </div>
            {company.aboutUs && (
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <SearchSlash className="w-5 h-5 flex-shrink-0" />
                        <span className="text-2xl font-bold">About this company</span>
                    </div>
                    <span className="text-justify whitespace-pre-line">{company.aboutUs}</span>
                </div>
            )}
        </div>
    )
}


export default CompanyDetails;