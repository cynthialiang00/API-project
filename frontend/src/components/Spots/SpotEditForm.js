import React from "react";
import * as spotActions from '../../store/spot';
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./SpotForm.css";

function SpotEditForm({user}) {
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
    const [lat, setLat] = useState(1.23);
    const [lng, setLng] = useState(1.23);
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const[hasSubmitted, setHasSubmitted] = useState(false);

    


    const [spotErrors, setSpotErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        setSpotErrors({});


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

    if (!user) {
        return history.push("/not-found");
    }
    if (Object.keys(spot).length === 0) {
        return null;}
    
    return (
        <div className="create-container">
            <h3>Create a new Spot</h3>
            <form className="create-form" onSubmit={handleSubmit}>
                <div className="inputs-container">
                    <div className="inputs-header">Where's your place located?</div>
                    <div className="inputs-brief">
                        Guests will only get your exact address once they booked
                        a reservation.
                    </div>
                    <div className="form-label-input">
                        <label>
                            Country
                            <input
                                type="text"
                                value={country}
                                placeholder="Country"
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </label>
                        {hasSubmitted && spotErrors["country"] &&
                            <p className="errors">{spotErrors["country"]}</p>}
                    </div>

                    <div className="form-label-input">
                        <label>
                            Street Address
                            <input
                                type="text"
                                value={address}
                                placeholder="Address"
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </label>
                        {hasSubmitted && spotErrors["address"] &&
                            <p className="errors">{spotErrors["address"]}</p>}

                    </div>

                    <div className="form-label-input">
                        <span>
                            <label>
                                City

                            </label>
                            <input
                                className="city"
                                type="text"
                                value={city}
                                placeholder="City"
                                onChange={(e) => setCity(e.target.value)}
                            />

                            {hasSubmitted && spotErrors["city"] &&
                                <p className="errors">{spotErrors["city"]}</p>}
                        </span>
                        <span className="comma">,</span>
                        <span>
                            <label>
                                State

                            </label>
                            <input
                                className="state"
                                type="text"
                                value={state}
                                placeholder="STATE"
                                onChange={(e) => setState(e.target.value)}
                            />

                            {hasSubmitted && spotErrors["state"] &&
                                <p className="errors">{spotErrors["state"]}</p>}
                        </span>
                    </div>

                </div>

                <div className="inputs-container">
                    <div className="inputs-header">
                        Describe your place to guests
                    </div>
                    <div className="inputs-brief">
                        Mention the best features of your space, any special amenities
                        like fast wifi or parking, and what you love about the neighborhood.
                    </div>
                    <div className="form-label-input">
                        <textarea
                            type="text"
                            value={description}
                            placeholder="Please write at least 30 characters"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        {hasSubmitted && spotErrors["description"] &&
                            <p className="errors">{spotErrors["description"]}</p>}
                    </div>

                </div>

                <div className="inputs-container">
                    <div className="inputs-header">
                        Create a title for your spot
                    </div>
                    <div className="inputs-brief">
                        Catch guests' attention with a spot title that highlights what
                        makes your place special.
                    </div>
                    <div className="form-label-input">
                        <input
                            type="text"
                            value={name}
                            placeholder="Name of your spot"
                            onChange={(e) => setName(e.target.value)}
                        />
                        {hasSubmitted && spotErrors["name"] &&
                            <p className="errors">{spotErrors["name"]}</p>}
                    </div>

                </div>

                <div className="inputs-container">
                    <div className="inputs-header">
                        Set a base price for your spot
                    </div>
                    <div className="inputs-brief">
                        Competitive pricing can help your listing stand out
                        and rank higher in search results.
                    </div>
                    <div className="form-label-input">
                        <label className="pricetag">
                            $
                        </label>
                        <input
                            type="text"
                            value={price}
                            placeholder="Price per night (USD)"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        {hasSubmitted && spotErrors["price"] &&
                            <p className="errors">{spotErrors["price"]}</p>}
                    </div>

                </div>

                <button type="submit"
                >Update Spot</button>
            </form>
        </div>
    )



}

export default SpotEditForm;