import { useContext, useEffect } from "react";
import { login, register, logout, getMe } from "../services/auth.api";
import { AuthContext } from "../auth.context";
import { useNavigate } from "react-router";

export const useAuth = () => {
    const context= useContext(AuthContext)
    const navigate = useNavigate()

    const{user,setUser,loading,setLoading} = context

    const handleLogin= async ({email, password}) => {
        setLoading(true);
        try{
        const data= await login({email,password})
        if(data && data.user){
            setUser(data.user)
            return true
        }
        return false
        }
        catch(err){
            return false
        }
        finally{
        setLoading(false)
        }
    }

    const handleRegister= async({username,email,password}) => {

        setLoading(true);
        try{
        const data= await register({username,email,password})
        if(data && data.user){
            return true
        }
        return false
        }
        catch(err){
            return false
        }finally{
        setLoading(false);
        }
    }

    const handleLogout= async() => {
       setLoading(true)
       try{
           const response = await logout()
           if(response && response.message){
               setUser(null)
               navigate('/login')
               return true
           } else {
               return false
           }
       } catch(err){
           setUser(null) // Clear user even if API fails
           navigate('/login')
           return false
       } finally{
           setLoading(false)
       }
    }

    useEffect(()=>{
    const getAndSetUser= async ()=> {
        try{
        const data= await getMe()
        if(data && data.user){
            setUser(data.user)
        }
        }
        catch(err){
        } finally{
        setLoading(false)
        }
    }
        getAndSetUser()

 },[])

    return ({user,loading,handleLogin, handleRegister, handleLogout})
}