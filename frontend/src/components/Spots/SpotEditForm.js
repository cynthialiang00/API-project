import React from "react";
import * as spotActions from '../../store/spot';
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./SpotForm.css";

function SpotEditForm() {
    const spot = useSelector(state => state.spots.singleSpot)
    const {spotId} = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(spotActions.thunkGetSpotDetail(spotId));
    }, [dispatch, spotId])

    useEffect (() => {
        setCountry(spot.country);
        setAddress(spot.address);
        setCity(spot.city);
        setState(spot.state);
        setLat(spot.lat);
        setLng(spot.lng);
        setDescription(spot.description);
        setName(spot.name);
        setPrice(spot.price);
        
    }, [spot])

    const history = useHistory();
    

    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    


    const [spotErrors, setSpotErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSpotErrors({});


        // set default values for lat/lng if no inputs
        if (!lat) {
            setLat(1.23);
        };
        if (!lng) {
            setLng(1.23);
        };

        const newSpot = JSON.stringify({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        })
        console.log("newSpot", newSpot)

        await spotActions.fetchEditSpot(spotId, newSpot)
            .then(() => history.push(`/spots/${spot.id}`))
            .catch(async (response) => {
                const validationErrors = await response.json();
                if (validationErrors.errors) setSpotErrors(validationErrors.errors)
            })
        
    }

    
    if (Object.keys(spot).length === 0) {
        return null;}

    return (
        <div className="create-container">
            <h3>Update Your Spot</h3>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="inputs-container">
                    <div className="inputs-header">Where's your place located?</div>
                    <div className="inputs-brief">
                        Guests will only get your exact address once they booked
                        a reservation.
                    </div>
                    <label>
                        Country
                        <input
                            type="text"
                            value={country}
                            placeholder="country"
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </label>
                    {spotErrors["country"] &&
                        <p className="errors">{spotErrors["country"]}</p>}

                    <label>
                        Street Address
                        <input
                            type="text"
                            value={address}
                            placeholder="address"
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </label>
                    {spotErrors["address"] &&
                        <p className="errors">{spotErrors["address"]}</p>}

                    <label>
                        City
                        <input
                            type="text"
                            value={city}
                            placeholder="city"
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </label>
                    {spotErrors["city"] &&
                        <p className="errors">{spotErrors["city"]}</p>}

                    <div className="comma">,</div>

                    <label>
                        State
                        <input
                            type="text"
                            value={state}
                            placeholder="state"
                            onChange={(e) => setState(e.target.value)}
                        />
                    </label>
                    {spotErrors["state"] &&
                        <p className="errors">{spotErrors["state"]}</p>}

                    <label>
                        Latitude
                        <input
                            type="text"
                            value={lat}
                            placeholder="lat"
                            onChange={(e) => setLat(e.target.value)}
                        />
                    </label>
                    {spotErrors["lat"] &&
                        <p className="errors">{spotErrors["lat"]}</p>}

                    <div className="comma">,</div>

                    <label>
                        Longitude
                        <input
                            type="text"
                            value={lng}
                            placeholder="lng"
                            onChange={(e) => setLng(e.target.value)}
                        />
                    </label>
                    {spotErrors["lng"] &&
                        <p className="errors">{spotErrors["lng"]}</p>}
                </div>

                <div className="divider"></div>

                <div className="inputs-container">
                    <div className="inputs-header">
                        Describe your place to guests
                    </div>
                    <div className="inputs-brief">
                        Mention the best features of your space, any special amenities
                        like fast wifi or parking, and what you love about the neighborhood.
                    </div>
                    <textarea
                        type="text"
                        value={description}
                        placeholder="Please write at least 30 characters"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {spotErrors["description"] &&
                        <p className="errors">{spotErrors["description"]}</p>}
                </div>

                <div className="inputs-container">
                    <div className="inputs-header">
                        Create a title for your spot
                    </div>
                    <div className="inputs-brief">
                        Catch guests' attention with a spot title that highlights what
                        makes your place special.
                    </div>
                    <input
                        type="text"
                        value={name}
                        placeholder="name"
                        onChange={(e) => setName(e.target.value)}
                    />
                    {spotErrors["name"] &&
                        <p className="errors">{spotErrors["name"]}</p>}
                </div>
                <div className="inputs-container">
                    <div className="inputs-header">
                        Set a base price for your spot
                    </div>
                    <div className="inputs-brief">
                        Competitive pricing can help your listing stand out
                        and rank higher in search results.
                    </div>
                    <label>
                        $
                        <input
                            type="text"
                            value={price}
                            placeholder="price"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </label>
                    {spotErrors["price"] &&
                        <p className="errors">{spotErrors["price"]}</p>}
                </div>

                
                <button type="submit">Update Spot</button>
            </form>
        </div>
    )



}

export default SpotEditForm;