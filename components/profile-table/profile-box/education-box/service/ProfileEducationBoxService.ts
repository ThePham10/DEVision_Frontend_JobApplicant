import { Education, EducationCreateData } from "../types";
import { APPLICANT_URL, EDUCATION_URL } from "@/config/URLConfig";
import { httpHelper } from "@/utils/httpHelper";

export async function createEducation(data : EducationCreateData) {
    try {
        const response = await httpHelper.post(EDUCATION_URL, data)

        if (response.status === 201) {
            return response.data
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getEducation(id : string) {
    try {
        const response = await httpHelper.get<Education[]>(EDUCATION_URL + "/applicant/" + id)

        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        console.log(error)
    }
}

export async function updateEducation(id : string, data: Partial<Omit<Education, "id" | "createdAt">>) {
    try {
        const response = await httpHelper.put(EDUCATION_URL + "/" + id, data)

        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        console.log(error)
    }
}

export async function deleteEducation(id : string) {
    try {
        const response = await httpHelper.delete(EDUCATION_URL + "/" + id)

        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        console.log(error)
    }
}

export async function updateHighestEducation(eduName: string, applicantId: string) {
    try {
        const response = await httpHelper.put(APPLICANT_URL + "/" + applicantId, { highestEducation: eduName})

        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        console.log(error)
    }
}