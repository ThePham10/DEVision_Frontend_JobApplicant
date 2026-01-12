import { Company } from "../types";
import { Mail, MapPinHouse, SearchSlash, Phone, Plane } from "lucide-react";

interface CompanyDetailProps {
    company: Company;
    onClose: () => void;
}

const CompanyDetails = ({ company, onClose }: CompanyDetailProps) => {
    return (
        <div>
            <div className="flex items-start justify-between mb-2">
                <div className="flex flex-col gap-2">
                    <h3 className="text-3xl font-bold text-gray-900 leading-tight">{company.companyName}</h3>
                    {company.subscriptionType && (
                        <span className={`w-fit px-2 py-1 text-xs font-bold text-white rounded-full ${company.subscriptionType === 'FREE' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                            {company.subscriptionType}
                        </span>
                    )}
                </div>
                <button
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                >
                    Close
                </button>
            </div>
            <div className="flex flex-col gap-3 mt-2">
                <div className="flex items-center gap-2 text-base text-gray-600">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <span>{company.email}</span>
                </div>
                {company.streetAddress && (
                    <div className="flex items-center gap-2 text-base text-gray-600">
                        <MapPinHouse className="w-5 h-5 text-gray-500" />
                        <span>{company.streetAddress}</span>
                    </div>
                )}
                {company.country && (
                    <div className="flex items-center gap-2 text-base text-gray-600">
                        <Plane className="w-5 h-5 text-gray-500" />
                        <span>{company.country}</span>
                    </div>
                )}
                {company.phoneNumber && (
                    <div className="flex items-center gap-2 text-base text-gray-600">
                        <Phone className="w-5 h-5 text-gray-500" />
                        <span>{company.phoneNumber}</span>
                    </div>
                )}
            </div>
            {company.aboutUs && (
                <div className="flex flex-col gap-2 mt-4">
                    <div className="flex items-center gap-2">
                        <SearchSlash className="w-5 h-5 text-gray-500" />
                        <span className="text-lg font-bold">About this company</span>
                    </div>
                    <span className="text-justify whitespace-pre-line text-gray-700 leading-relaxed">{company.aboutUs}</span>
                </div>
            )}
        </div>
    );
}

export default CompanyDetails;