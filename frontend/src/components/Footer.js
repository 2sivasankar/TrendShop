import react from 'react';
import {Link} from 'react-router-dom';
const Footer=()=>{
    return (
        <footer style={{padding:'10px',background:'#eee'}}>
            <Link to="/home" style={{marginRight:'10px'}}>Home</Link>
            <Link to="/login" style={{marginRight:'10px'}}>Login</Link>
            <Link to="/register" style={{marginRight:'1px'}}>Register</Link>
        </footer>
    )
}
export default Footer