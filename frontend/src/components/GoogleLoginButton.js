import React from 'react';
import {GoogleLogin} from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import {googleLogin} from "../services/authService";

const GoogleLoginButton =()=>{
    const navigate=useNavigate();
    const handleSuccess= async(CredentialResponse)=>{
            console.log("Google Credential:", CredentialResponse.credential);

        try{
            const res=await googleLogin(CredentialResponse.credential);
            const {token,user}=res.data;

            localStorage.setItem('user',JSON.stringify(user));
            localStorage.setItem('token',token);

            alert("Logged in successfully with google");
            navigate("/home");

        }catch(error){
            console.error("Google login failed",error);
            alert("Google login failed");
        }
    };

    return(
        <GoogleLogin  onSuccess={handleSuccess} onError={()=>{alert("failed to Googlelogin")}} />
    
    );
};

export default GoogleLoginButton;