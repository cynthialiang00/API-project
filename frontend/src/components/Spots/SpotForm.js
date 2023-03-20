import React from "react";
import * as spotActions from '../../store/spot';
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./SpotForm.css";

function SpotForm() {
    const history = useHistory();
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);

    const [hasSubmitted, setHasSubmitted] = useState(false);

    const lat = 1.23;
    const lng = 1.23;


    const [prevImgURL, setPrevImgURL] = useState("");

    const [imgURL1, setImgURL1] = useState("");
    const [imgURL2, setImgURL2] = useState("");
    const [imgURL3, setImgURL3] = useState("");
    const [imgURL4, setImgURL4] = useState("");
    

    const [spotErrors, setSpotErrors] = useState({});
    const [imgErrors, setImgErrors] = useState({});
    const [prevErrors, setPrevErrors] = useState({});

    useEffect(() => {
        const errors = {};
        const previewErrors = {};
        const urlErrors = {};

        if (!country) errors["country"] = "Country is required";
        if (!address) errors["address"] = "Street address is required";
        if (!city) errors["city"] = "City is required";
        if(!state) errors["state"] = "State is required";
        if(!description) errors["description"] = "Description needs a minimum of 30 characters";
        if(!name) errors["name"] = "Name is required";
        if (!price) errors["price"] = "Price per day is required";

        if (!prevImgURL) previewErrors["preview"] = "Preview image is required.";
        if (prevImgURL && !prevImgURL.endsWith('.png') && !prevImgURL.endsWith('.jpg') && !prevImgURL.endsWith('.jpeg')) {
            previewErrors["url"] = "Image url must end in .png, .jpg, or .jpeg";
        }
        if (imgURL1 && !imgURL1.endsWith('.png') && !imgURL1.endsWith('.jpg') && !imgURL1.endsWith('.jpeg')) {
            urlErrors["url"] = "Image url must end in .png, .jpg, or .jpeg";
        }
        if (imgURL2 && !imgURL2.endsWith('.png') && !imgURL2.endsWith('.jpg') && !imgURL2.endsWith('.jpeg')) {
            urlErrors["url"] = "Image url must end in .png, .jpg, or .jpeg";
        }
        if (imgURL3 && !imgURL3.endsWith('.png') && !imgURL3.endsWith('.jpg') && !imgURL3.endsWith('.jpeg')) {
            urlErrors["url"] = "Image url must end in .png, .jpg, or .jpeg";
        }
        if (imgURL4 && !imgURL4.endsWith('.png') && !imgURL4.endsWith('.jpg') && !imgURL4.endsWith('.jpeg')) {
            urlErrors["url"] = "Image url must end in .png, .jpg, or .jpeg";
        }

        setPrevErrors(previewErrors)
        setImgErrors(urlErrors)
        setSpotErrors(errors)
    }, [address, city, state, country, name, description, price, prevImgURL, imgURL1, imgURL2, imgURL3, imgURL4])

    const imgObjCreator = (imageUrl, previewBool = false) => {
        return JSON.stringify({
            url: imageUrl,
            preview: previewBool
        })
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (Object.keys(prevErrors).length || Object.keys(imgErrors).length) {            
            return;
        };

        setSpotErrors({});
        setImgErrors({});
        const imgArr = [];

        if (prevImgURL.length) imgArr.push(imgObjCreator(prevImgURL,true));
        if (imgURL1.length) imgArr.push(imgObjCreator(imgURL1));
        if (imgURL2.length) imgArr.push(imgObjCreator(imgURL2));
        if (imgURL3.length) imgArr.push(imgObjCreator(imgURL3));
        if (imgURL4.length) imgArr.push(imgObjCreator(imgURL4));


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

        
    
        const newSpotData = await spotActions.fetchCreateSpot(newSpot, imgArr)
            .catch(async (response) => {
                const validationErrors = await response.json();
                console.log(validationErrors)
                if (validationErrors.errors) setSpotErrors(validationErrors.errors)
            })


        history.push(`/spots/${newSpotData.id}`);
        

    }

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

                <div className="inputs-container">
                    <div className="inputs-header">
                        Liven up your spot with photos
                    </div>
                    <div className="inputs-brief">
                        Submit a link to at least one photo to publish
                        your spot.
                    </div>
                    <div className="form-label-input">
                        <input
                            type="text"
                            value={prevImgURL}
                            placeholder="Preview Image URL"
                            onChange={(e) => setPrevImgURL(e.target.value)}
                        />
                        {hasSubmitted && prevErrors.preview &&
                            <p className="errors">{prevErrors.preview}</p>}
                        {hasSubmitted && prevErrors.url &&
                            <p className="errors">{prevErrors.url}</p>}
                    </div>
                    <div className="form-label-input">
                        <input
                            type="text"
                            value={imgURL1}
                            placeholder="Image URL"
                            onChange={(e) => setImgURL1(e.target.value)}
                        />
                        {hasSubmitted && imgErrors.url &&
                            <p className="errors">{imgErrors.url}</p>} 
                    </div>
                    <div className="form-label-input">
                        <input
                            type="text"
                            value={imgURL2}
                            placeholder="Image URL"
                            onChange={(e) => setImgURL2(e.target.value)}
                        />
                        {hasSubmitted && imgErrors.url &&
                            <p className="errors">{imgErrors.url}</p>} 
                    </div>         
                    <div className="form-label-input">
                        <input
                            type="text"
                            value={imgURL3}
                            placeholder="Image URL"
                            onChange={(e) => setImgURL3(e.target.value)}
                        />
                        {hasSubmitted && imgErrors.url &&
                            <p className="errors">{imgErrors.url}</p>}
                    </div>  
                    <div className="form-label-input">
                        <input
                            type="text"
                            value={imgURL4}
                            placeholder="Image URL"
                            onChange={(e) => setImgURL4(e.target.value)}
                        />
                        {hasSubmitted && imgErrors.url &&
                            <p className="errors">{imgErrors.url}</p>}
                    </div>
                        
                </div>
                

                <button type="submit"
                >Create Spot</button>
            </form>
        </div>
    )
    
    
    
}

export default SpotForm;
