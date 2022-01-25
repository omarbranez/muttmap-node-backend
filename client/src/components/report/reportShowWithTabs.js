import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import ReportFormMap from './reportFormMap'
import ReportAnalyzeImage from './reportAnalyzeImage'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { createReport, reportFormChange, reportFormSelectChange, reportFormImageChange } from '../../actions/reportActions'
import { getBreeds } from '../../actions/breedActions'
import { setGeolocatedCenter } from '../../actions/mapActions'
import { colors } from '../../colors'
import MuttmapNewReport from '../../muttmap-new-dog-report.png'

const ReportForm = (props) => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [showMap, setShowMap] = useState(false)
    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)
    const [name, setName] = useState('')
    const [dogId, setDogId] = useState(null)
    const [color, setColor] = useState('')
    const [gender, setGender] = useState('')
    const [age, setAge] = useState(null)
    const [features, setFeatures] = useState('')
    const [demeanor, setDemeanor] = useState('')
    const [photo, setPhoto] = useState(null)
    const [photoAllowed, setPhotoAllowed] = useState('')
    
    useEffect(() => {
        dispatch(getBreeds())
    }, [dispatch])

    useEffect(() => {
        dispatch(setGeolocatedCenter())
    }, [dispatch])
    
    const handleSubmit = (e) => {
        e.preventDefault()
        props.createReport({name, color, gender, lat, lng, age, features, demeanor, photo, user_id: props.user.id, dog_id: dogId})
        navigate('/map', {replace: true})
    }

    function triggerInput(input, enteredValue) { // should be a blog post. REACT HATES THIS
        const lastValue = input.value
        input.value = enteredValue
        const event = new Event("input", { bubbles: true })
        const tracker = input._valueTracker
        if (tracker) {
            tracker.setValue(lastValue)
        }
        input.dispatchEvent(event)
    }

    const handleCurrentLocationClick = () => { 
        triggerInput(document.getElementById("lat-field"), props.currentCenter.lat)
        triggerInput(document.getElementById("lng-field"), props.currentCenter.lng)
    }

    const sendMapToForm = ({lat, lng}) => {
        triggerInput(document.getElementById("lat-field"), lat)
        triggerInput(document.getElementById("lng-field"), lng)
    }

    const confirmClicked = () => {
        setShowMap(!showMap)
    }

    const allowPhoto = (verdict) => {
        if (verdict === "disallow"){
            setPhoto(null)
            alert("The selected photo is not allowed. Please select a different one")
        } else {
            setPhotoAllowed("allow")
        }        
    }
    const isSubmitEnabled = 
        age && color && features && demeanor && gender && lat && lng && name && dogId && photo && (photoAllowed == "allow")
    
    const breeds = props.breeds.map(breed => ({value: breed.id, label: breed.breed, attribute: "dogId"}))

    const addPhoto = (photo) => {
        setPhoto(photo)
    }

    return (
        <div>
            <img src={MuttmapNewReport} width="500"></img>
                <h2 style={{color: 'red'}}>All Fields Are Required</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Location</label><br />
                    <input id="lat-field" disabled type="text" name="lat" onChange={(e)=>setLat(e.target.value)} value={lat}/>
                    <input id="lng-field" disabled type="text" name="lng" onChange={(e)=>setLng(e.target.value)} value={lng}/>
                    <input type="button" disabled={showMap} onClick={handleCurrentLocationClick} value="Use Current Location"/>
                    <input type="button" onClick={()=>setShowMap(!showMap)} value="Find Location on Map"/>
                </div>
                <br />
                <div >
                    {showMap && !props.geolocating ? <ReportFormMap mapCoordinates={props.currentCenter} mapLoading={props.geolocating} sendMapToForm={sendMapToForm} confirmClicked={confirmClicked}/> : null }
                </div>
                <br />
                <div>
                    <label>Breed</label><br />
                    <Select placeholder="Select Breed" onChange={(option)=>setDogId(option.value)} options={breeds} /> 
                </div>
                <br />
                <div>
                    <label>Dog's Name</label><br />
                    <input type="text" name="name" onChange={(e)=>setName(e.target.value)} value={name} pattern="[A-Za-z]{1,16}"/>
                </div>
                <br />
                <div>
                    <label>Dog's Age</label><br />
                    <input type="number" name="age" onChange={(e)=>setAge(e.target.value)} value={age} min="0" max="30"/>
                </div>
                <br />
                <div>
                    <label>Dog's Color/Markings</label><br />
                    <Select placeholder="Select Color/Markings" onChange={(option)=>setColor(option.value)} options={colors}/>
                </div>
                <br />
                <div>
                    <label>Dog's Gender</label><br />
                    <select name="gender" selected={gender} onChange={(e)=>setGender(e.target.value)}>
                        <option value="" selected disabled hidden>Pick One</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Unknown">Unknown</option>
                    </select>
                </div>
                <br />
                <div>
                    <label>Dog's Features</label><br />
                    <textarea name="features" onChange={(e)=>setFeatures(e.target.value)} value={features} />
                </div>
                <br />
                <div>
                    <label>Dog's Demeanor</label><br />
                    <textarea name="demeanor" onChange={(e)=>setDemeanor(e.target.value)} value={demeanor} />
                </div>
                <br />
            <div>
                <ReportAnalyzeImage addPhoto={addPhoto} breeds={props.breeds} allowPhoto={allowPhoto}/>
            </div>
                <div>
                    <input type="submit" value="Submit New Report" disabled={!isSubmitEnabled}/>
                </div>
            </form>
        </div>
    )
}


const mapStateToProps = (state) => ({
    breeds: state.breeds.breeds,
    loading: state.breeds.loading,
    currentCenter: state.user.currentCenter,
    geolocating: state.user.geolocating,
    user: state.user
})

export default connect(mapStateToProps, { createReport, getBreeds, reportFormChange, reportFormSelectChange, reportFormImageChange })(ReportForm)
