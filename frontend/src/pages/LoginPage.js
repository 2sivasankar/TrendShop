import React , {useState} from 'react';
import {useNavigate,Link} from "react-router-dom"
import {loginUser} from "../services/authService";
import GoogleLoginButton from '../components/GoogleLoginButton';
import ReCAPTCHA from "react-google-recaptcha";

const LoginPage=()=>{
    const [captchaToken,setCaptchaToken]=useState(null);

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate();
    const handleLogin=async(e)=>{
        e.preventDefault();
        console.log("Login button clicked");
        try{
            const res=await loginUser({email,password,captchaToken});
            console.log('logined with ',res.data);

            localStorage.setItem("token",res.data.token);
            console.log("res.data.user:", res.data.user);
            localStorage.setItem("user",JSON.stringify(res.data.user));

            //navigate to the homepage
            navigate("/home");


        } catch(err){
            if(err.response){
                console.error('login error',err.response.data);
                alert("Login failed: "+err.response.data.message);
            }else if(err.request){
                //no response from backend
                console.error("No response from the server:",err.request);
                alert("No response from server");
            }else{
                   console.error("Error during login:", err.message);
                    alert("Login failed: " + err.message);
            }

        }
    };

    const handleCaptcha =(token)=>{
        setCaptchaToken(token);
    
    };


    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div style={{marginBottom:'1rem'}}>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required style={{width:'100%',padding:'0.5rem'}} />
                </div>
                <div style={{marginBottom:'1rem'}}>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required style={{width:'100%',padding:'0.5rem'}} />

                </div>
              
            <ReCAPTCHA sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} onChange={handleCaptcha} />
              

                <button type="submit" onClick={() => console.log("Button clicked")} style={{padding:'0.5rem 1rem'}}>
                    Login
                </button>
            
            <p style={{ marginTop: '1rem' }}>
   <Link to="/forgot-password">forgot password ?</Link>
</p>

            </form>
            <hr />
            <p> or login with Google</p>
            <GoogleLoginButton />
        </div>
    );
};
export default LoginPage;