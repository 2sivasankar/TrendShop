import React,{useState} from 'react';
import {useNavigate} from "react-router-dom";
import {registerUser} from "../services/authService"
import GoogleLoginButton from '../components/GoogleLoginButton';
import ReCAPTCHA from "react-google-recaptcha";


const Register=()=>{
    const [name,setName]=useState('');
    const [password,setPassword]=useState('');
    const [email,setEmail]=useState('');
    const [captchaToken,setCaptchaToken]=useState(null);
    const navigate=useNavigate();
    const handleCaptcha =(token)=>{
        setCaptchaToken(token);
    
    };
    const handleRegister=async(e)=>{
        e.preventDefault();
        console.log("Login button clicked");
        try{
            const res=await registerUser({name,password,email,captchaToken});
            console.log('registered with ',res.data);

            localStorage.setItem("token",res.data.token);
            localStorage.setItem("user",JSON.stringify(res.data.user));

            navigate("/home");
        }catch(err){
            if(err.response){
                console.error('signUP error',err.response.data);
                alert("SignUp failed"+err.response.data.message);
            }else if(err.request){
                console.error("NO response to the server",err.request);
                alert("NO respose from the server");
            }else{
                console.error("Error during sign Up",err.message);
                alert("Error during signUp"+err.message);

            }
        }
    };

    return (
        <div>
            <h2>register</h2>
            <form onSubmit={handleRegister}>
                <div style={{marginBottom:'1rem'}}>
                    <label>name</label>
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} required style={{width:'100%',padding:'0.5rem'}} />
                </div>
                <div style={{marginBottom:'1rem'}}>
                    <label>email</label>
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required style={{width:'100%',padding:'0.5rem'}} />
                </div>
                <div style={{marginBottom:'1rem'}}>
                    <label>password</label>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required style={{width:'100%',padding:'0.5rem'}} />
                </div>
                
                
            <ReCAPTCHA sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} onChange={handleCaptcha} />
                
                
                <div style={{marginBottom:'1rem'}}>
                    <button type="submit" style={{padding:'0.5rem 1rem'}} >
                        SignUp
                    </button>
                 </div>



            </form>
            <hr />
             <p> or signUp with Google</p>
                        <GoogleLoginButton />
        </div>
    );
};

export default Register;