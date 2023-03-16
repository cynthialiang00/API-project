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

    

    const history = useHistory();
    const [country, setCountry] = useState(spot.country);
    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [lat, setLat] = useState(spot.lat);
    const [lng, setLng] = useState(spot.lng);
    const [description, setDescription] = useState(spot.description);
    const [name, setName] = useState(spot.name);
    const [price, setPrice] = useState(spot.price);


    const [spotErrors, setSpotErrors] = useState({});

    
    console.log("SPOTTT ERRORS: ", spotErrors)

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


        dispatch(spotActions.thunkEditSpot(spot.id, newSpot))
            .catch(async (response) => {
                const data = await response.json();
                console.log(data)
                if( data.errors) {
                    
                    console.log("There are errors in data entry")
                    setSpotErrors(data.errors)
                } 
                
            })
        

        if (Object.keys(spotErrors).length) return;
        else history.push(`/spots/${spot.id}`);
    }

    

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