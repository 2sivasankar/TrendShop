import React,{useState} from 'react';
import { resetPassword } from '../services/authService';
import { useParams } from 'react-router-dom';
const ResetPassword=()=>{
        const [newPassword,setNewPassword]=useState('');
        const {token}=useParams();
        const handleSubmit=async (e)=>{
            e.preventDefault();
            try{
                            await resetPassword(token,newPassword);
                            alert("password reset successful");
            
                        }catch(error){
                            alert(error.responce?.data?.message || "something went wrong");
                        }
            
                    };
            
        

    return (
        <>
        <form onSubmit={handleSubmit}>
        <h2> Reset  password </h2>
        <input type="password" value={newPassword} placeholder="new password" onChange={e=> setNewPassword(e.target.value)} required />
        <button type="submit"> Reset password</button>
        </form>
        </>
    );
};
export default ResetPassword;