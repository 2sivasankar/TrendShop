import react,{useState,useEffect} from 'react';
import {postAd} from '../services/adService';
import {useNavigate} from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

    
const PostingAd=()=>{
  const [user,setUser]=useState(null);
      const [captchaToken,setCaptchaToken]=useState(null);
  
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const [price,setPrice]=useState('');
    const [pincode,setPincode]=useState('');
    const [category,setCategory]=useState('');
    const navigate=useNavigate();
    const [image,setImage]=useState(null);
        
    useEffect(()=>{
         try {
        const storedUser=localStorage.getItem("user");
        if(!storedUser){
            alert("you must be loged in to post an ad .");
           // navigate("/login");
        }else{
            const parseUser=JSON.parse(storedUser);
            if(!parseUser || !parseUser.id){
                alert("User not logged in. Please log in again.");
                navigate("/login");
                return;
            }
            setUser(parseUser);
        }
    } catch (err) {
      console.error("Error reading user from localStorage", err);
      localStorage.removeItem("user");
      navigate("/login");
    }
    },[navigate]);
    const handleCaptcha =(token)=>{
        setCaptchaToken(token);
    
    };
    const handlePostAd=async(e)=>{
        e.preventDefault();

        console.log("submiting post button clicked");
        const storedUser=localStorage.getItem("user");
        const parseUser=JSON.parse(storedUser);
        if(!parseUser ||!parseUser.id){
             alert("User not logged in. Please log in again.");
        navigate("/login");
        return;
        }
        try{
            
        const formData=new FormData();
formData.append("image", image);
formData.append("title", title);
formData.append("description", description);
formData.append("price", price);
formData.append("category", category);
formData.append("pincode", pincode);
formData.append("userId", parseUser.id);
formData.append("captchaToken", captchaToken);
      //  formData.append("image",image);
       // formData.append("adData",JSON.stringify(adData));
        const res=await postAd(formData);
                console.log("ad data is posted");
                alert("Ad posted successfully");
        }catch(error){
            console.error("Error in posting data",error.response?.data || error.message);
                alert("failure to post ad");
        }
        
    }
    return(
        <form onSubmit={handlePostAd}>
            
                <div  stle={{marginBottom:'1rem'}}>
                     <label>Title</label>
                    <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} style={{padding:"0.5rem",width:"50%"}} />
                </div> 
               
                <div style={{marginBottom:"1rem"}}>
                     <label>Description</label>
                    <textarea value={description} onChange={(e)=>setDescription(e.target.value)} style={{padding:"0.5rem",width:"50%",height:"5rem"}} />
                </div>
                <div style={{marginBottom:"1rem"}}>
                    <label>price</label>
                    <input type="number" value={price}  onChange={(e)=>setPrice(e.target.value)} style={{padding:"0.5rem",width:"5rem"}} />
                </div>
                <div style={{marginBottom:"1rem"}}>
                    <label>category</label>
                    <input type="text" value={category}  onChange={(e)=>setCategory(e.target.value)} style={{padding:"0.5rem",width:"5rem"}} />
                </div>
                <div style={{marginBottom:"1rem"}}>
                    <label>pincode</label>
                    <input type="number" value={pincode}  onChange={(e)=>setPincode(e.target.value)} style={{padding:"0.5rem",width:"5rem"}} />
                </div>
              <div style={{marginBottom:"1rem"}}>
                    <label>upload images</label>
                    <input type="file" accept="image/*" onChange={(e)=>setImage(e.target.files[0])} style={{padding:"0.5rem",width:"5rem"}} />
                </div>
            <div>
               
            <ReCAPTCHA sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} onChange={handleCaptcha} />
               
               
                <button type="submit">post my add</button>
            </div>
        </form>
    )
}


export default PostingAd;
