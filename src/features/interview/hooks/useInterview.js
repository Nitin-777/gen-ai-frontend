import { useContext, useEffect } from 'react'
import {getAllInterviewReports,getInterviewReportById,generateInterviewReport} from '../services/interview.api'
import { InterviewContext } from '../interview.context'
import { useParams } from "react-router"



export const useInterview= () => {

    
   const context=useContext(InterviewContext)
    const { interviewId }= useParams()
   if(!context){
            throw new Error("Use interview must be within Interview Provider")

   }

   const { loading, setLoading, report, setReport, reports, setReports} = context

  const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
    setLoading(true)
    try {
        if (!resumeFile) {
            throw new Error("Resume file is required");
        }
        if (!jobDescription || !selfDescription) {
            throw new Error("Job description and self description are required");
        }

        const response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile })
        
        if (!response || !response.interviewReport) {
            throw new Error("Failed to generate report - invalid response");
        }

        setReport(response.interviewReport)
        return response.interviewReport
    } catch (err) {
        const errorMsg = err.response?.data?.error || err.response?.data?.message || err.message || "Failed to generate report";
        alert("Error: " + errorMsg);
        return null
    } finally {
        setLoading(false)
    }
}


   const getReportById = async(interviewId) => {
    let response=null
    setLoading(true)
    try{
         response= await getInterviewReportById(interviewId)
        setReport(response.interviewReport)
    }
    catch(err){
        console.log(err)
    } finally{
        setLoading(false)
    }
    
    return response.interviewReport

   }

const getReports = async () => {
    setLoading(true)
    try {
        const response = await getAllInterviewReports()
        setReports(response.interviewReports)
        return response.interviewReports
    } catch (err) {
        return []
    } finally {
        setLoading(false)
    }
}

useEffect(() =>{
        if(interviewId){
            getReportById(interviewId)
        }
        else{
            getReports()
        }
}, [ interviewId ])



   return { loading, report, reports, generateReport, getReportById, getReports}
}




