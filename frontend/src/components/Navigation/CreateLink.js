import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function CreateLink ({user}) {
    if (!user) return null;
    return (
    <div className="create-spot">
        <NavLink to="/spots/new">Create a New Spot</NavLink>
    </div>
    )
}

export default CreateLink;