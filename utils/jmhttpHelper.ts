import { ApiResponse, HttpError } from "./httpHelper";

// Define the jm api url and api key
const JM_API_BASE_URL = process.env.NEXT_PUBLIC_JM_API_URL || "";
const JM_API_KEY = process.env.NEXT_PUBLIC_JM_API_KEY || "";

/**
 * JM http helper class
 */
class JmHttpHelper {
    private baseUrl: string;
    private apiKey: string;

    constructor(baseUrl: string, apiKey: string) {
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<ApiResponse<T>> {
        const url = `${this.baseUrl}${endpoint}`;

        const config: RequestInit = {
            ...options,
            headers: {
                "Content-Type": "application/json",
                "x-external-api-key": this.apiKey,
                ...options.headers,
            },
        };

        const response = await fetch(url, config);

        // Handle empty responses (204 No Content)
        if (response.status === 204) {
            return { status: response.status, data: {} as T };
        }

        const data = await response.json();

        if (!response.ok) {
            const error = new Error(
                data.message || "Request failed"
            ) as HttpError;
            error.status = response.status;
            error.data = data;
            throw error;
        }

        return { status: response.status, data };
    }

    /**
     * GET request
     * @param endpoint - API endpoint (e.g., '/users')
     * @returns Promise with status and response data
     */
    async get<T>(endpoint: string): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { method: "GET" });
    }

    /**
     * POST request
     * @param endpoint - API endpoint (e.g., '/users')
     * @param data - Request body
     * @returns Promise with status and response data
     */
    async post<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    /**
     * PUT request
     * @param endpoint - API endpoint (e.g., '/users/123')
     * @param data - Request body
     * @returns Promise with status and response data
     */
    async put<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: "PUT",
            body: JSON.stringify(data),
        });
    }

    /**
     * PATCH request
     * @param endpoint - API endpoint (e.g., '/users/123')
     * @param data - Partial request body
     * @returns Promise with status and response data
     */
    async patch<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: "PATCH",
            body: JSON.stringify(data),
        });
    }

    /**
     * DELETE request
     * @param endpoint - API endpoint (e.g., '/users/123')
     * @returns Promise with status and response data
     */
    async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { method: "DELETE" });
    }
}

// JM API helper (API key auth, no refresh token)
export const jmHttpHelper = new JmHttpHelper(JM_API_BASE_URL, JM_API_KEY);

export { JmHttpHelper }
