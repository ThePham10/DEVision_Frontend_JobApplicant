import { HeadlessForm } from "@/components/headless-form/ui/Form";
import type { FormConfig } from "@/components/headless-form/types/types";
import { usePersonalSettingForm } from "./hook/usePersonalSettingForm";
import { Mail, Phone, MapPin, Pencil } from "lucide-react";
import { AvatarBox } from "@/components/profile-table/profile-box/avatar-box/ui/AvatarBox";

export const PersonalBoxForm = () => {
    const {
        isAuthenticated,
        user,
        userAccount,
        getCountryName,
        handleSubmit,
        initialValues,
    } = usePersonalSettingForm();

    if (!isAuthenticated || !user) return null;

    const formConfig: FormConfig = {
        children: [
            { name: "name", title: "Name", type: "text", placeholder: userAccount?.name || "", colSpan: 1 },
            { name: "phone", title: "Phone Number", type: "text", placeholder: userAccount?.phone || "", colSpan: 1 },
            { name: "country", title: "Country", type: "country", placeholder: userAccount?.country || "", colSpan: 1 },
        ],
        buttonText: "Save Changes",
        buttonClassName: "col-span-2",
        layout: {
            type: "grid",
            columns: 2,
            gap: "6",
        },
    };

    return (
        <div className="space-y-8">
            {/* Profile Info Card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-1">
                <div className="relative bg-white rounded-xl p-6">
                    {/* Decorative background pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-100 to-purple-100 rounded-full translate-y-1/2 -translate-x-1/2 opacity-50" />

                    <div className="flex items-center gap-4 mb-6">
                        <AvatarBox />
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">{userAccount?.name || "User"}</h2>
                        </div>
                    </div>

                    <div className="relative z-10">
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {/* Email */}
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                    <Mail className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs text-gray-500 font-medium">Email</p>
                                    <p className="text-sm text-gray-900 font-semibold break-all">{userAccount?.email}</p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                    <Phone className="w-5 h-5 text-green-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs text-gray-500 font-medium">Phone</p>
                                    <p className="text-sm text-gray-900 font-semibold break-all">{userAccount?.phone || "Not set"}</p>
                                </div>
                            </div>

                            {/* Country */}
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-purple-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs text-gray-500 font-medium">Country</p>
                                    <p className="text-sm text-gray-900 font-semibold break-all">{getCountryName(userAccount?.country) || "Not set"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Form Section */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <Pencil className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Edit Your Information</h3>
                        <p className="text-sm text-gray-500">Update your personal details below</p>
                    </div>
                </div>
                <HeadlessForm config={formConfig} onSubmit={handleSubmit} initialValues={initialValues} />
            </div>
        </div>
    );
};
