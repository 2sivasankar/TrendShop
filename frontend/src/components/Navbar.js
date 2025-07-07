import React from 'react';
import {Link} from 'react-router-dom';
const Navbar=()=>{
    return(
        <nav style={{padding:'10px',background:'#eee'}}>
            <Link to="/home" style={{marginRight:'10px'}}>Home</Link>
            <Link to="/login" style={{marginRight:'10px'}}>Login</Link>
            <Link to="/logout" style={{marginRight:'10px'}}>Logout</Link>
            <Link to="/register" style={{marginRight:'1px'}}>Register</Link>
             <Link to="/post" style={{marginRight:'1px'}}>post</Link>
              <Link to="/allads" style={{marginRight:'1px'}}>ads</Link>
            
        </nav>
    );
};

export default Navbar;