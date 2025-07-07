import axios from "axios";
const API="http://localhost:3000/api/auth";
export const loginUser=async (userData)=>{
    return await axios.post(`${API}/login`,userData);
};
export const registerUser=async (userData)=>{
    return await axios.post(`${API}/register`,userData);
}

//google login

export const googleLogin =async (googleCredential)=>{
    return await axios.post(`${API}/google/callback`,{credential:googleCredential});
}

//forgot password
export const forgotPassword=async(email)=>{
    return await axios.post(`${API}/forgot-password`,{email});
        
    };

//reset password
export const resetPassword=async(token,newPassword)=>{
    return await axios.post(`${API}/reset-password/${token}`,{newPassword});
        
    };