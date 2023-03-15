import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotActions from '../../store/spot';
import { useEffect, useState } from "react";
import "./SpotForm.css";

function SpotForm() {
    const dispatch = useDispatch();
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);


    const [img, setImg] = useState('');

    const [errors, setErrors] = useState({});


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        // return dispatch(sessionActions.thunkLogin({ credential, password }))
        //     .then(closeModal)
        //     .catch(async (response) => {
        //         const data = await response.json();
        //         if (data && data.errors) setErrors(data.errors);
        //     });
    }

    return (
        <form onSubmit={handleSubmit}>
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
                        placeholder="Country"
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Street Address
                    <input
                        type="text"
                        value={address}
                        placeholder="Address"
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </label>

                <label>
                    City
                    <input
                        type="text"
                        value={city}
                        placeholder="City"
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </label>

                <div className="comma">,</div>

                <label>
                    State
                    <input
                        type="text"
                        value={state}
                        placeholder="STATE"
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Latitude
                    <input
                        type="text"
                        value={lat}
                        placeholder="Latitude"
                        onChange={(e) => setLat(e.target.value)}
                        required
                    />
                </label>

                <div className="comma">,</div>

                <label>
                    Longitude
                    <input
                        type="text"
                        value={lng}
                        placeholder="Longitude"
                        onChange={(e) => setLng(e.target.value)}
                        required
                    />
                </label>
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
                <label>
                    <textarea
                        type="text"
                        value={description}
                        placeholder="Please write at least 30 characters"
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
            </div>

            <div className="inputs-container">
                <div className="inputs-header">
                    Create a title for your spot
                </div>
                <div className="inputs-brief">
                    Catch guests' attention with a spot title that highlights what
                    makes your place special.
                </div>
                <label>
                    <input
                        type="text"
                        value={name}
                        placeholder="Name of your spot"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
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
                        placeholder="Price per night (USD)"
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div className="inputs-container">
                <div className="inputs-header">
                    Liven up your spot with photos
                </div>
                <div className="inputs-brief">
                    Submit a link to at least one photo to publish
                    your spot.
                </div>
                <label>
                    <input
                        type="text"
                        value={price}
                        placeholder="Price per night (USD)"
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </label>
            </div>

            <button type="submit">Create Spot</button>
            {errors["credential"] &&
                <p className="errors">{errors["credential"]}</p>}
            {errors["password"] &&
                <p className="errors">{errors["password"]}</p>}
        </form>
    )
    
    
    
}

export default SpotForm;

// const testCreate = async (e) => {
    //     e.preventDefault();

    //     const data = await spotActions.fetchCreateSpot(JSON.stringify(testSpot));
    //     // then redirect to /spots/${data.id} blah blah blah
    //     console.log("data: ", data)
    //     console.log(data.id)

    // }