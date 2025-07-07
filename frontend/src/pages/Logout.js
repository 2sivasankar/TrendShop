import {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
const Logout=()=>{
    const navigate=useNavigate();
    useEffect(()=>{
        localStorage.clear();
        navigate("/login");
    },[navigate]);
    return <p>you are logouting ....</p>;
}
 

export default Logout;