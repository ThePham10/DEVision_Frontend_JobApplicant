import { httpHelper } from "@/utils/httpHelper";
import { ApplicantAccount, ApplicantFilters, PaginatedResponse } from "../types";

const mockApplicants: ApplicantAccount[] = [
    {
        id: "a1",
        name: "thetest1",
        email: "thetest1@gmail.com",
        phone: "0123456789",
        emailVerified: true,
        subscription: true,
        createdAt: new Date("2024-01-15T10:00:00Z")
    },
    {
        id: "a2",
        name: "thetest2",
        email: "thealo@gmail.com",
        phone: "0987654321",
        emailVerified: false,
        subscription: false,
        createdAt: new Date("2024-02-20T14:30:00Z")
    },
    {
        id: "a3",
        name: "Thanh The",
        email: "thanhthe@gmail.com",
        phone: "0997755332",
        emailVerified: true,
        subscription: false,
        createdAt: new Date("2024-03-10T09:15:00Z")
    },
    {
        id: "a4",
        name: "Dang Thai Hoang",
        email: "hoangdang@gmail.com",
        phone: "0129873645",
        emailVerified: false,
        subscription: true,
        createdAt: new Date("2024-04-05T16:45:00Z")
    },
    {
        id: "a5",
        name: "Nguyen Van A",
        email: "johnhenry@gmail.com",
        phone: "0112233445",
        emailVerified: true,
        subscription: false,
        createdAt: new Date("2024-05-01T12:00:00Z")
    },
    {
        id: "a6",
        name: "Le Thi B",
        email: "mariamisa@gmail.com",
        phone: "0223344556",
        emailVerified: false,
        subscription: true,
        createdAt: new Date("2024-06-12T11:20:00Z")
    }
];


async function loadApplicants(
    page: number,
    limit: number,
    filters?: ApplicantFilters
): Promise<PaginatedResponse<ApplicantAccount>> {
    // const response = await httpHelper.get<PaginatedResponse<ApplicantAccount>>(APPLICANT_MANAGEMENT_URL);
    const response = {
        status: 200,
        data: {
            data: mockApplicants,
            total: mockApplicants.length,
            page,
            limit,
            hasMore: false
        }
    };
    
    if (response.status === 200) {
        let filteredItems = response.data.data;
    
        if (filters) {
            if (filters.name) {
                const searchTerm = filters.name.toLowerCase();
                filteredItems = filteredItems.filter(applicant =>
                    applicant.name.toLowerCase().includes(searchTerm)                
                );
            }

            if (filters.email) {
                const searchTerm = filters.email.toLowerCase();
                filteredItems = filteredItems.filter(applicant =>
                    applicant.email.toLowerCase().includes(searchTerm)                
                );
            }

            if (filters.phone) {
                const searchTerm = filters.phone.toLowerCase();
                filteredItems = filteredItems.filter(applicant =>
                    applicant.phone.toLowerCase().includes(searchTerm)                
                );
            }
            
            if (filters.emailVerified !== undefined) {
                filteredItems = filteredItems.filter(applicant =>
                    applicant.emailVerified === filters.emailVerified
                );
            }

            if (filters.subscription !== undefined) {
                filteredItems = filteredItems.filter(applicant =>
                    applicant.subscription === filters.subscription
                );
            }
        }
        
        // Sort by createdAt descending (newest first)
        filteredItems.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
        const startIndex = (page - 1) * limit;
        const paginatedItems = filteredItems.slice(startIndex, startIndex + limit);
        
        return {
            data: paginatedItems,
            total: filteredItems.length,
            page,
            limit,
            hasMore: startIndex + limit < filteredItems.length
        };
    } else {
        return {
            data: [],
            total: 0,
            page: 0,
            limit: 0,
            hasMore: false
        };
    }
}

export { 
    loadApplicants
};
