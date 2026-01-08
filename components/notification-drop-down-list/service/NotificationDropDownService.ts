import { httpHelper } from "@/utils/httpHelper";
import { NOTIFICATION_URL } from "@/config/URLConfig";
import { GetResponse, PatchResponse } from "../types/types";

export async function getNotificationDropDownList() {
    try {
        const response = await httpHelper.get<GetResponse>(NOTIFICATION_URL); 
    
        if ( response.status === 200 ) {
            return response.data;
        }
    } catch (err) {
        console.log(err);
    }
}

export async function markAsRead(notificationId: string) {
    try {
        const response = await httpHelper.patch<PatchResponse>(`${NOTIFICATION_URL}/${notificationId}/read`, {}); 
    
        if ( response.status === 200 ) {
            return response.data;
        }
    } catch (err) {
        console.log(err);
    }
}

export async function markAllAsRead() {
    try {
        const response = await httpHelper.post<PatchResponse>(`${NOTIFICATION_URL}/mark-all-read`, {}); 
    
        if ( response.status === 200 ) {
            return response.data;
        }
    } catch (err) {
        console.log(err);
    }
}