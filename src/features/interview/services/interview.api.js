import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api= axios.create({
    baseURL: API_URL,
    withCredentials: true,  
})


export const generateInterviewReport=async ({ jobDescription, selfDescription, resumeFile}) =>{
       try{
       const formData= new FormData()
       formData.append("jobDescription", jobDescription)
       formData.append("selfDescription", selfDescription)
       formData.append("resume", resumeFile)

       const response= await api.post("/api/interview", formData,{
        headers:{
            "Content-Type" : "multipart/form-data"
        }
       })

       return response.data
       }
       catch(err){
           console.error('Generate interview report error:', err.response?.status, err.message)
           throw err
       }
}

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