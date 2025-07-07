import React,{useState} from 'react';
import { forgotPassword } from '../services/authService';
const ForgotPassword=()=>{
        const [email,setEmail]=useState('');
        const handleSubmit=async (e)=>{
            e.preventDefault();
            try{
                await forgotPassword(email);
                alert("password reset link send to email");

            }catch(error){
                alert(error.responce?.data?.message || "something went wrong");
            }

        };

    return (
        <>
        <form onSubmit={handleSubmit}>
        <h2> forgot password </h2>
        <input type="email" value={email} placeholder="email" onChange={e=>setEmail (e.target.value)} required />
        <button type="submit"> send reset link</button>
        </form>
        </>
    );
};
export default ForgotPassword;