import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function CreateLink ({user}) {
    
    if (!user) return null;

    return (
    <span>
            <NavLink className="nav-create-spot" to="/spots/new">
                <i class="fa-solid fa-house-chimney-medical"></i>
            </NavLink>
    </span>
    )
}

export default CreateLink;