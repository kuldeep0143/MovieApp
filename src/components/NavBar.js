import { Component } from "react";
import {Link} from "react-router-dom";

class NavBar extends Component{
    render(){
        return(
        <div style={{display:"flex",padding:'1rem',color:"#1f6dd4"}}>
            <Link to="/" style={{textDecoration:"none"}}><h1>Movies App</h1></Link>
            <Link to="/Favourites" style={{textDecoration:"none"}}><h2 style={{marginLeft:"2rem",marginTop:"1rem"}}>Favourites</h2></Link>
        </div>
        )
    }
}

export default NavBar;