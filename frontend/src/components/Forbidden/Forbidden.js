import React from "react";
import { NavLink } from "react-router-dom";
import "./Forbidden.css"
function Forbidden() {
    return (
        <div className="forbidden">
            <h1>404 Not Found</h1>
            <NavLink exact to="/">Click here to be redirected to the Landing Page</NavLink>
        </div>
    )

}

export default Forbidden;