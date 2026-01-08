import { httpHelper } from "@/utils/httpHelper";
import { Company, CompanyFilters, PaginatedResponse } from "../types";
import { COMPANY_URL } from "@/config/URLConfig";

export const MOCK_COMPANIES: Company[] = [
    { id: "cmp-001", name: "Atalanta Tech Solutions", email: "contact@atalanta.tech", address: "12 Innovation Way, Melbourne VIC 3000", isActive: true, createdAt: new Date("2024-08-05T09:30:00Z"), updatedAt: new Date("2024-08-05T09:30:00Z"), description: "Atalanta Tech Solutions is a leading provider of innovative technology services and solutions, specializing in software development, cloud computing, and IT consulting. Our mission is to empower businesses through cutting-edge technology and exceptional service.", field: "Information Technology" },
    { id: "cmp-002", name: "GreenLeaf Biotech", email: "hello@greenleaf.bio", address: "88 Research Blvd, Brisbane QLD 4000", isActive: true, createdAt: new Date("2023-11-20T14:15:00Z"), updatedAt: new Date("2024-01-15T10:00:00Z"), description: "GreenLeaf Biotech is dedicated to advancing agricultural biotechnology through innovative research and sustainable solutions. We focus on developing genetically modified crops that enhance yield, resist pests, and adapt to changing climates, contributing to global food security.", field: "Biotechnology" },
    { id: "cmp-003", name: "Harbor Financial Group", email: "support@harborfinancial.com.au", address: "200 King St, Sydney NSW 2000", isActive: true, createdAt: new Date("2022-02-01T08:00:00Z"), updatedAt: new Date("2024-06-01T08:30:00Z"), description: "Harbor Financial Group is a premier financial services firm offering a comprehensive range of solutions including wealth management, investment advisory, and retirement planning. Our team of experienced professionals is committed to helping clients achieve their financial goals through personalized strategies and expert guidance.", field: "Financial Services" },
    { id: "cmp-004", name: "Sunrise Education Trust", email: "info@sunrise-edu.org", address: "5 College Ave, Adelaide SA 5000", isActive: false, createdAt: new Date("2021-06-10T12:00:00Z"), updatedAt: new Date("2022-03-02T09:00:00Z") },
    { id: "cmp-005", name: "Orbit Logistics", email: "operations@orbitlogistics.com", address: "17 Cargo Rd, Perth WA 6000", isActive: true, createdAt: new Date("2025-02-10T07:45:00Z"), updatedAt: new Date("2025-02-10T07:45:00Z") },
    { id: "cmp-006", name: "BlueWave Energy", email: "contact@bluewave.energy", address: "301 Ocean Drive, Gold Coast QLD 4217", isActive: true, createdAt: new Date("2024-03-18T10:00:00Z"), updatedAt: new Date("2024-03-18T10:00:00Z") },
    { id: "cmp-007", name: "Cornerstone Realty", email: "agents@cornerstone.re", address: "9 Property Ln, Hobart TAS 7000", isActive: true, createdAt: new Date("2020-09-01T09:20:00Z"), updatedAt: new Date("2021-02-10T11:10:00Z") },
    { id: "cmp-008", name: "FreshBite Foods", email: "sales@freshbite.com.au", address: "42 Market St, Canberra ACT 2600", isActive: true, createdAt: new Date("2023-04-12T11:30:00Z"), updatedAt: new Date("2023-07-01T12:00:00Z") },
    { id: "cmp-009", name: "PixelForge Studios", email: "devs@pixelforge.studio", address: "7 Arcade Way, Wollongong NSW 2500", isActive: true, createdAt: new Date("2024-12-01T16:00:00Z"), updatedAt: new Date("2024-12-01T16:00:00Z") },
    { id: "cmp-010", name: "NorthStar Marketing", email: "team@northstar.marketing", address: "101 Brand St, Darwin NT 0800", isActive: false, createdAt: new Date("2021-01-22T13:45:00Z"), updatedAt: new Date("2021-10-05T09:00:00Z") },
    { id: "cmp-011", name: "Lumen Health Services", email: "contact@lumenhealth.au", address: "250 Wellness Ave, Sydney NSW 2021", isActive: true, createdAt: new Date("2019-05-15T07:00:00Z"), updatedAt: new Date("2025-01-02T08:00:00Z") },
    { id: "cmp-012", name: "Forge Manufacturing Co.", email: "manufacturing@forge-mfg.com", address: "400 Industrial Pkwy, Newcastle NSW 2300", isActive: true, createdAt: new Date("2022-10-30T05:30:00Z"), updatedAt: new Date("2023-08-20T14:30:00Z") },
    { id: "cmp-013", name: "BrightBridge Consulting", email: "info@brightbridge.consulting", address: "3 Advisory Ct, Geelong VIC 3220", isActive: true, createdAt: new Date("2024-01-07T10:10:00Z"), updatedAt: new Date("2024-04-01T09:00:00Z"), description: "BrightBridge Consulting is a premier business consulting firm specializing in strategic planning, operational efficiency, and market analysis. Our team of experts collaborates with clients to deliver tailored solutions that drive growth, enhance performance, and create lasting value in competitive markets.", field: "Business Consulting" },
    { id: "cmp-014", name: "MarketHive Retail", email: "support@markethive.retail", address: "56 Shopper's Row, Sunshine Coast QLD 4558", isActive: true, createdAt: new Date("2023-07-21T09:00:00Z"), updatedAt: new Date("2024-09-10T10:20:00Z"), description: "MarketHive Retail is a dynamic retail company focused on delivering exceptional shopping experiences through a diverse range of products and services. We are committed to innovation, customer satisfaction, and sustainable business practices that benefit our communities.", field: "Retail" },
    { id: "cmp-015", name: "Civic Works Studio", email: "studio@civicworks.studio", address: "14 Design Ln, Ballarat VIC 3350", isActive: false, createdAt: new Date("2020-12-11T15:00:00Z"), updatedAt: new Date("2021-01-01T10:00:00Z"), description: "Civic Works Studio is an architecture and urban planning firm committed to creating sustainable and innovative designs that enhance community living. Our projects range from residential developments to public spaces, all aimed at fostering connectivity and environmental responsibility.", field: "Architecture" },
];

async function loadCompaniesMock(
    page: number,
    limit: number,
): Promise<PaginatedResponse<Company>> {
    const total = MOCK_COMPANIES.length;
    const start = Math.max((page - 1) * limit, 0);
    const end = start + limit;
    const items = MOCK_COMPANIES.slice(start, end);
    const hasMore = page * limit < total;

    return Promise.resolve({
        data: items,
        total,
        page,
        limit,
        hasMore,
    });
}

async function deactivateCompany(
    companyId: string,
): Promise<boolean> {
    const company = MOCK_COMPANIES.find(c => c.id === companyId);
    if (company) {
        company.isActive = false;
        company.updatedAt = new Date();
        return Promise.resolve(true);
    }
    return Promise.resolve(false);
}

async function activateCompany(
    companyId: string,
): Promise<boolean> {
    const company = MOCK_COMPANIES.find(c => c.id === companyId);
    if (company) {
        company.isActive = true;
        company.updatedAt = new Date();
        return Promise.resolve(true);
    }
    return Promise.resolve(false);
}

/* async function loadCompanies(
    page: number,
    limit: number,
): Promise<PaginatedResponse<Company>> {
    const endpoint = `${COMPANY_URL}?page=${page}&limit=${limit}`;
    const response = await httpHelper.get<PaginatedResponse<Company>>(endpoint);

    if (response.status === 200) {
        const items = response.data.data ?? [];
        const total = (response.data as any).total ?? items.length;
        const hasMore = page * limit < total;

        return {
            data: items,
            total,
            page,
            limit,
            hasMore,
        };
    }

    return {
        data: [],
        total: 0,
        page: 0,
        limit: 0,
        hasMore: false,
    };
}

async function deactivateCompany(
    companyId: string,
): Promise<boolean> {
    const url = `${COMPANY_URL}/${companyId}`;
    const response = await httpHelper.delete<Company>(url);

    if (response.status === 200) {
        return true;
    } else {
        return false;
    }
}

async function activateCompany(
    companyId: string,
): Promise<boolean> {
    const response = await httpHelper.put<Company>(COMPANY_URL + "/" + `${companyId}`, { isActive: true });
    
    if (response.status === 200) {
        return true;
    } else {
        return false;
    }
} */

export { 
    deactivateCompany,
    activateCompany, 
    loadCompaniesMock
};
