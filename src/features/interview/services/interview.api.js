import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api= axios.create({
    baseURL: API_URL,
    withCredentials: true,  
})


export const generateInterviewReport=async ({ jobDescription, selfDescription, resumeFile}) =>{\n       try{\n       const formData= new FormData()\n       formData.append("jobDescription", jobDescription)\n       formData.append("selfDescription", selfDescription)\n       formData.append("resume", resumeFile)\n\n       const response= await api.post("/api/interview", formData,{\n        headers:{\n            "Content-Type" : "multipart/form-data"\n        }\n       })\n\n       return response.data\n       }\n       catch(err){\n           console.error('Generate interview report error:', err.response?.status, err.message)\n           throw err\n       }\n}

export const getInterviewReportById= async (interviewId) =>{
    try{
    const response= await api.get(`/api/interview/report/${interviewId}`)
    return response.data
    }
    catch(err){
        console.error('Get interview report error:', err.response?.status, err.message)
        throw err
    }
}

export const getAllInterviewReports=async() =>{
    try{
    const response=await api.get("/api/interview")
    return response.data
    }
    catch(err){
        console.error('Get all interview reports error:', err.response?.status, err.message)
        throw err
    }
}