import react from "react";
const Home=()=>{
    const user=JSON.parse(localStorage.getItem("user"));

    return (
        <div>
            <h1>Welcome, {user?.name|| "User"}!</h1>
            <p>YOu are logged in...</p>

        </div>
    );
};
export default Home;