import { useAuthStore } from "@/store/authStore";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface HttpError extends Error {
  status: number;
  data?: unknown;
}

// Response type that includes status
export interface ApiResponse<T> {
  status: number;
  data: T;
}

class HttpHelper {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;

    const config: RequestInit = {
      ...options,
      credentials: 'include', // Allow cookies to be sent/received
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    };

    let response = await fetch(url, config);

    if (response.status === 401) {
      const refreshed = await this.refreshToken();

      if (refreshed) {
        response = await fetch(url, config);
      }
    }

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

  
  private async refreshToken(): Promise<boolean> {
      try {
          const isAdmin = useAuthStore.getState().isAdmin;
          const endpoint = isAdmin ? '/auth/admin/refresh' : '/auth/applicant/refresh';
          const response = await fetch(`${this.baseUrl}${endpoint}`, {
              method: 'POST',
              credentials: 'include', // Send refresh token cookie
          });
          return response.ok;
      } catch {
          return false;
      }
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
   * @param endpoint - API endpoint (e.g., '/auth/login')
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

// Main API helper
export const httpHelper = new HttpHelper(API_BASE_URL);

// External APIs
const COUNTRIES_API_URL = "https://restcountries.com/v3.1";
export const countriesApi = new HttpHelper(COUNTRIES_API_URL);

// Export class for custom instances if needed
export { HttpHelper };
