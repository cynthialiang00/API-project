import React from "react";
import * as spotActions from '../../store/spot';
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SpotFormGeocode from './SpotFormGeocode';

import "./SpotForm.css";

function SpotEditForm({user}) {

    const spot = useSelector(state => state.spots.singleSpot)
    const {spotId} = useParams();

    const dispatch = useDispatch();
    const history = useHistory();


    const [country, setCountry] = useState();
    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [description, setDescription] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();

    const [hasSubmitted, setHasSubmitted] = useState(false);


    const [spotErrors, setSpotErrors] = useState({});

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

    useEffect(() => {
        const errors = {};
        
        if (!country) errors["country"] = "Country is required";
        if (!address) errors["address"] = "Street address is required";
        if (!city) errors["city"] = "City is required";
        if (!state || state.length < 2 ) errors["state"] = "State is required";
        if (!description || description.length < 30 ) errors["description"] = "Description needs a minimum of 30 characters";
        if (!name || name.length < 5) errors["name"] = "Name is required and must be a minimum of 5 characters";
        if (!price || price <= 0) errors["price"] = "Price per day is required";
        if (!lat || !lng) errors["coords"] = "Valid lat and lng coordinates required";

        setSpotErrors(errors)
    }, [address, city, state, country, lat, lng, name, description, price])


    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (Object.keys(spotErrors).length) {
            return;
        };

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

        const editSpot = await spotActions.thunkEditSpot(spotId, newSpot);
        
        if (editSpot.statusCode === 400) {
            setSpotErrors(editSpot.errors);
            return;
        }

        else history.push(`/spots/${spotId}`);
        
    }

    if (!user) {
        return history.push("/not-found");
    }

    
    return (
        <div className="create-container">

            <h3>Edit Listing</h3>

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
                        </label>
                        <input
                            type="text"
                            value={country}
                            placeholder="Country"
                            onChange={(e) => setCountry(e.target.value)}
                        />
                        {hasSubmitted && spotErrors["country"] &&
                            <p className="errors">{spotErrors["country"]}</p>}
                    </div>

                    <div className="form-label-input">
                        <label>
                            Street Address
                        </label>
                        <input
                            type="text"
                            value={address}
                            placeholder="Address"
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        {hasSubmitted && spotErrors["address"] &&
                            <p className="errors">{spotErrors["address"]}</p>}

                    </div>

                    <div className="form-label-input">
                        <label id="city-state-label">
                            City, State
                        </label>


                        <div id="city-state-inputs">

                            <input
                                id="city"
                                type="text"
                                value={city}
                                placeholder="City"
                                onChange={(e) => setCity(e.target.value)}
                            />

                            {hasSubmitted && spotErrors["city"] &&
                                <p className="errors">{spotErrors["city"]}</p>}

                            <span className="comma">,</span>

                            <input
                                id="state"
                                type="text"
                                value={state}
                                placeholder="State"
                                onChange={(e) => setState(e.target.value)}
                            />

                            {hasSubmitted && spotErrors["state"] &&
                                <p className="errors">{spotErrors["state"]}</p>}
                        </div>
                    </div>



                    <div className="form-label-input">
                        <label>
                            Lat, Lng
                        </label>
                        <div id="lat-lng-inputs">

                            <input type="number"
                                value={lat}
                                placeholder="lat"
                                onChange={(e) => setLat(e.target.value)}
                            />
                            ,
                            <input type="number"
                                value={lng}
                                placeholder="lng"
                                onChange={(e) => setLng(e.target.value)}
                            />

                        </div>
                        {hasSubmitted && spotErrors["coords"] &&
                            <p className="errors">{spotErrors["coords"]}</p>}

                    </div>


                    <div id="form-map-finder">

                        <SpotFormGeocode address={address} city={city} state={state}
                            lat={lat}
                            lng={lng}
                            setLat={setLat}
                            setLng={setLng}
                        />




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
                        Create a title for your listing
                    </div>
                    <div className="inputs-brief">
                        Catch guests' attention with a listing title that highlights what
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
                        Set a base price (per night) for your listing
                    </div>
                    <div className="inputs-brief">
                        Competitive pricing can help your listing stand out
                        and rank higher in search results.
                    </div>
                    <div className="form-label-input">
                        <label id="price-tag">
                            $
                        </label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            placeholder="Price per night (USD)"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        {hasSubmitted && spotErrors["price"] &&
                            <p className="errors">{spotErrors["price"]}</p>}
                    </div>

                </div>

                <button type="submit"
                    disabled={hasSubmitted && Object.keys(spotErrors).length > 0}
                >
                    Edit Listing
                </button>
            </form>
        </div>

    )



}

export default SpotEditForm;