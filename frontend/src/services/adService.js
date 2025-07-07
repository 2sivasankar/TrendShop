import axios from "axios";
const API="http://localhost:3000/api/ads";
 const postAd=async (adData)=>{
    return await axios.post(`${API}/post`,adData);
};

const getAllAds=async ()=>{
    return await axios.get(`${API}`)
};
export  {postAd,getAllAds};