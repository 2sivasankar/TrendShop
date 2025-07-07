import React,{useEffect,useState} from 'react';
import { getAllAds } from "../services/adService";

const AllAdsPage=()=>{
    const [ads,setAds]=useState([]);
    const [error,setError]=useState("");
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        const fetchAds=async ()=>{
           try{
            const responce=await getAllAds();
            setAds(responce.data);
            setLoading(false);
           }
           catch(error){
                setError("Failed to load ads");
                setLoading(false);
                console.log("Failed to fetch ads",error);
           } 
        };
        fetchAds();
    },[]);

    if(loading){
        return <p>Loading ads</p>;
    }
    if(error){
        return <p>{error}</p>;
    }
    return(
        <>
        <h2>All Advertisements</h2>
        {
        ads.length==0?(
            <p>No ads found</p>
        ):(
            <ul>
                {
                    ads.map((ads)=>(
                        <li key={ads.id} style={{marginBottom:"1rem",border:"1px solid #ccc"}}>
                        <h3>{ads.title}</h3>
                        <p><strong>Description:</strong>{ads.description}</p>
                        <p><strong>price:</strong>{ads.price}</p>
                        <p><strong>category:</strong>{ads.category}</p>
                        <p><strong>Pincode:</strong>{ads.pincode}</p>
                        <p><strong>Posted:</strong>{ads.user?.name || "Unknown"}</p>
                      

                        </li>
                    ))
                }
            </ul>
        )}
        </>
    );
};
export default AllAdsPage;
