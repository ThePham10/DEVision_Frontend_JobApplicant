import { httpHelper } from "@/utils/httpHelper";
import { NOTIFICATION_URL } from "@/config/URLConfig";
import { GetResponse, PatchResponse } from "../types/types";

/**
 * Get notification drop down list
 * @returns notification list, total and unread count
 */
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

/**
 * Mark notification as read
 * @param notificationId notification id
 * @returns status (success or not)
 */
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

/**
 * Mark all notifications as read
 * @returns status (success or not)
 */
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