import { HeadlessForm } from "@/components/headless-form/ui/Form";
import type { FormConfig } from "@/components/headless-form/types/types";
import { useAuthStore } from "@/store/authStore";
import { FormValues } from "@/components/headless-form/types/types";
import { getUserInfo, updateUserInfo } from "../personal-box/api/PersonalBoxService";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { AccountData } from "./types";
import { useQueryClient } from "@tanstack/react-query";

export const PersonalBoxForm = () => {
    const { isAuthenticated, user } = useAuthStore();

    const queryClient = useQueryClient();

    const { data: fetchedData } = useQuery({
        queryKey: ['userInfo', user?.id],
        queryFn: () => {
            if (!user) throw new Error("User not found");
            return getUserInfo(user.id);
        },
        enabled: isAuthenticated && !!user,
    });

    const userAccount = fetchedData?.data;

    const updateMutation = useMutation({
        mutationFn: (data: Partial<AccountData>) => updateUserInfo(data),
        onSuccess: async () => {
            if (!user) return;
            await getUserInfo(user.id);
            queryClient.invalidateQueries({ queryKey: ['userInfo', user.id] });
        }
    });

    if (!isAuthenticated || !user) return null;

    const formConfig: FormConfig = {
        children: [
            { name: "name", title: "Name", type: "text", placeholder: userAccount?.name || "", colSpan: 1 },
            { name: "phone", title: "Phone Number", type: "text", placeholder: userAccount?.phone || "", colSpan: 1 },
        ],
        buttonText: "Save Changes",
        buttonClassName: "col-span-2",
        layout: {
            type: "grid",
            columns: 2,
            gap: "6",
        },
    };  

    const handleSubmit = async (values: FormValues) => {
        updateMutation.mutate(values as Partial<AccountData>);
    }

    return (
        <div className="space-y-8">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 p-6">
                <div className="flex items-start gap-4">
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">{userAccount?.name || "Your Profile"}</h2>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-500">Email:</span>
                            <p className="text-lg text-gray-700 font-medium">{userAccount?.email}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Edit Your Information</h3>
                <HeadlessForm config={formConfig} onSubmit={handleSubmit} />
            </div>
        </div>
    )
}
