import React from "react";
import * as spotActions from '../../store/spot';
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./SpotForm.css";

function SpotEditForm() {

    const spot = useSelector(state => state.spots.singleSpot)

    const dispatch = useDispatch();

    const history = useHistory();
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);


    const [prevImgURL, setPrevImgURL] = useState("");

    const [imgURL1, setImgURL1] = useState("");
    const [imgURL2, setImgURL2] = useState("");
    const [imgURL3, setImgURL3] = useState("");
    const [imgURL4, setImgURL4] = useState("");


    const [spotErrors, setSpotErrors] = useState({});
    const [imgErrors, setImgErrors] = useState({});

    const imgObjCreator = (imageUrl, previewBool = false) => {
        return JSON.stringify({
            url: imageUrl,
            preview: previewBool
        })
    };

    // const testImage = () => {
    //     const newArr = [];

    //     if (prevImgURL.length) newArr.push(imgObjCreator(prevImgURL,true));
    //     if (imgURL1.length) newArr.push(imgObjCreator(imgURL1));
    //     if (imgURL2.length) newArr.push(imgObjCreator(imgURL2));
    //     if (imgURL3.length) newArr.push(imgObjCreator(imgURL3));
    //     if (imgURL4.length) newArr.push(imgObjCreator(imgURL4));
    //     console.log(newArr);
    //     return;
    // }



    const handleSubmit = async (e) => {
        e.preventDefault();
        setSpotErrors({});
        setImgErrors({});

        const imgArr = [];

        if (prevImgURL.length) imgArr.push(imgObjCreator(prevImgURL, true));
        if (imgURL1.length) imgArr.push(imgObjCreator(imgURL1));
        if (imgURL2.length) imgArr.push(imgObjCreator(imgURL2));
        if (imgURL3.length) imgArr.push(imgObjCreator(imgURL3));
        if (imgURL4.length) imgArr.push(imgObjCreator(imgURL4));

        // set default values for lat/lng if no inputs
        if (!lat) {
            setLat(0);
        };
        if (!lng) {
            setLng(0);
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

        const newSpotData = await spotActions.thunkEditSpot(spot.id, newSpot)
            .catch(async (response) => {
                const validationErrors = await response.json();
                if (validationErrors.errors) setSpotErrors(validationErrors.errors)
            })
        // if (newSpotData && newSpotData.errors) setSpotErrors(newSpotData.errors)
        // console.log("data: ", newSpotData)
        // console.log("newspot id: ", newSpotData.id)

        // for (let img of imgArr) {
        //     const newImgData = await spotActions.fetchAddImg(newSpotData.id, img);
        //     if (newImgData && newImgData.errors) setImgErrors(newImgData.errors)
        // }

        history.push(`/spots/${newSpotData.id}`);

        // return dispatch(sessionActions.thunkLogin({ credential, password }))
        //     .then(closeModal)
        //     .catch(async (response) => {
        //         const data = await response.json();
        //         if (data && data.errors) setErrors(data.errors);
        //     });
    }

    return (
        <div className="create-container">
            <h3>Create a new Spot</h3>
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
                            placeholder={`${spot.country}`}
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
                            placeholder={`${spot.address}`}
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
                            placeholder={`${spot.city}`}
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
                            placeholder={`${spot.state}`}
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
                            placeholder={`${spot.lat}`}
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
                            placeholder={`${spot.lng}`}
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
                        placeholder={`${spot.description}`}
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
                        placeholder={`${spot.name}`}
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
                            placeholder={`${spot.price}`}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </label>
                    {spotErrors["price"] &&
                        <p className="errors">{spotErrors["price"]}</p>}
                </div>
                <div className="inputs-container">
                    <div className="inputs-header">
                        Liven up your spot with photos
                    </div>
                    <div className="inputs-brief">
                        Submit a link to at least one photo to publish
                        your spot.
                    </div>
                    <input
                        type="text"
                        value={prevImgURL}
                        placeholder="Preview Image URL"
                        onChange={(e) => setPrevImgURL(e.target.value)}
                    />
                    <input
                        type="text"
                        value={imgURL1}
                        placeholder="Image URL"
                        onChange={(e) => setImgURL1(e.target.value)}
                    />
                    <input
                        type="text"
                        value={imgURL2}
                        placeholder="Image URL"
                        onChange={(e) => setImgURL2(e.target.value)}
                    />
                    <input
                        type="text"
                        value={imgURL3}
                        placeholder="Image URL"
                        onChange={(e) => setImgURL3(e.target.value)}
                    />
                    <input
                        type="text"
                        value={imgURL4}
                        placeholder="Image URL"
                        onChange={(e) => setImgURL4(e.target.value)}
                    />
                </div>


                <button type="submit">Create Spot</button>
                {/* <button type="button" onClick={testImage}>Test Image Array</button> */}
            </form>
        </div>
    )



}

export default SpotEditForm;

// const testCreate = async (e) => {
    //     e.preventDefault();

    //     const data = await spotActions.fetchCreateSpot(JSON.stringify(testSpot));
    //     // then redirect to /spots/${data.id} blah blah blah
    //     console.log("data: ", data)
    //     console.log(data.id)

    // }