import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import ReportFormMap from './reportFormMap'
import ReportAnalyzeImage from './reportAnalyzeImage'
import { createReport, reportFormChange, reportFormSelectChange, reportFormImageChange, setSelectedReport } from '../../actions/reportActions'
import { getBreeds } from '../../actions/breedActions'
import { setGeolocatedLocation } from '../../actions/mapActions'
import { colors } from '../../colors'
import MuttmapNewReport from '../../muttmap-new-dog-report.png'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Select as MuiSelect } from '@mui/material'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import OutlinedInput from '@mui/material/OutlinedInput'
import PropTypes from 'prop-types'
import FormControlLabel from '@mui/material/FormControlLabel'
import MapLoadingSpinner from '../map/mapLoadingSpinner'


const ReportForm = (props) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [activeStep, setActiveStep] = useState(0)
    const [skipped, setSkipped] = useState(new Set())
    const [checked, setChecked] = useState([false])

    const [showMap, setShowMap] = useState(false)
    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)
    const [name, setName] = useState('')
    const [dogId, setDogId] = useState(null)
    const [breed, setBreed] = useState('')
    const [color, setColor] = useState('')
    const [colorInput, setColorInput] = useState('')
    const [gender, setGender] = useState('')
    const [age, setAge] = useState(null)
    const [features, setFeatures] = useState('')
    const [demeanor, setDemeanor] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [photo, setPhoto] = useState(null)
    const [photoAllowed, setPhotoAllowed] = useState('')

    const steps = ['Location', 'Breed', 'Name', "Age", "Color/Markings", "Gender", "Features", "Demeanor", "Photo", "Submit Report"]
    const stateArray = [[lat, lng], dogId, name, age, colorInput, gender, features, demeanor, photoAllowed]
    useEffect(() => {
        getBreeds(dispatch)
    }, [])

    useEffect(() => {
        setGeolocatedLocation(dispatch)
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        props.createReport({ name, color: colorInput, gender, lat: parseFloat(lat), lng: parseFloat(lng), age, features, demeanor, userId: props.user.user._id, breedId: dogId, imageUrl }, dispatch)
        navigate('/map', { replace: true })
    }

    const handleCurrentLocationClick = async() => {
        setGeolocatedLocation(dispatch)
        setLat(props.currentLocation.lat)
        setLng(props.currentLocation.lng)
        handleNext()
    }

    const sendMapToForm = ({ lat, lng }) => {
        setLat(lat)
        setLng(lng)
    }

    const confirmClicked = () => {
        setShowMap(!showMap)
        handleNext()
    }

    const allowPhoto = (verdict) => {
        if (verdict === "disallow") {
            setPhoto(null)
            alert("The selected photo is not allowed. Please select a different one")
        } else {
            setPhotoAllowed("allow")
        }
    }

    const handleBreedSelect = (option) => {
        setDogId(option.value)
        setBreed(option.label)
        setChecked([1])
    }

    const isStepOptional = (step) => {
        return step === 1
    }

    const isStepSkipped = (step) => {
        return skipped.has(step)
    }

    const handleNext = () => {
        let newSkipped = skipped
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values())
            newSkipped.delete(activeStep)
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        setSkipped(newSkipped)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const ageOptions = Array.from({ length: 20 }, (v, k) => k + 1)

    const isSubmitEnabled =
        age && colorInput && features && demeanor && gender && lat && lng && name && dogId && imageUrl && (photoAllowed == "allow")

    const breeds = props.breeds.map(breed => ({ value: breed._id, label: breed.name, attribute: "dogId" }))

    const addPhoto = (imageUrl) => {
        setImageUrl(imageUrl)
    }

    return (
        <Box sx={{ width: '100%', mt: 10 }}>

  
            {/* <Grid item md={6} sx={{ borderBottom: 1, borderColor: 'divider'}}>
                {(lat && lng) && <p>Location:<span>{lat}, {lng}</span></p>}
                <p>HELLO</p>
            </Grid> */}
            {/* <Grid item md={6} sx={{  borderBottom: 1, borderColor: 'divider' }}> */}

                <img src={MuttmapNewReport} width="500"></img>
                <h2 style={{ color: 'red' }}>All Fields Are Required</h2>
                <form onSubmit={handleSubmit}>

                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps = {}
                            const labelProps = {}
                            if (isStepSkipped(index)) {
                                stepProps.completed = false
                            }
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            )
                        })}
                    </Stepper>
            <Grid container sx={{mt: 5}}>
                <Grid item md={4} sx={{ borderBottom: 1, borderColor: 'divider'}}>
                {(lat && lng) && <p>Location: {lat}, {lng}</p>}
                {breed && <p>Breed: {breed}</p>}
                {name && <p>Name: {name}</p>}
                {age && <p>Age: {age}</p>}
                {color && <p>Color: {colorInput}</p>}
                {gender && <p>Gender: {gender}</p>}
                {features && <p>Features: {features}</p>}
                {demeanor && <p>Demeanor: {demeanor}</p>}
                {imageUrl && <p>Photo?: Yes</p>}
                {/* <p>HELLO</p> */}
            </Grid>
                                    <Grid item md={7} sx={{  borderBottom: 1, borderColor: 'divider' }}>
                    {activeStep === 0 && (
                        <div>
                            <label>Location</label>
                            <br />
                            <br />
                            <input type="button" disabled={showMap} onClick={handleCurrentLocationClick} value="Use Current Location" />
                            <br />
                            <input type="button" onClick={() => setShowMap(!showMap)} value="Find Location on Map" />

                        </div>
                    )}

                    <div >
                        {showMap ? !props.geolocating ? <ReportFormMap mapCoordinates={props.currentLocation} mapLoading={props.geolocating} sendMapToForm={sendMapToForm} confirmClicked={confirmClicked} /> : <MapLoadingSpinner text="Locating"/> : null}
                    </div>
                    {activeStep === 1 && (
                        <div>
                            <label>Breed</label><br />
                            <Select placeholder="Select Breed" onChange={(option) => handleBreedSelect(option)} options={breeds} />
                        </div>
                    )}

                    {activeStep === 2 && (
                        <div>
                            <FormControl margin='dense' sx={{ m: 1, minWidth: 100 }}>
                                <TextField value={name} onChange={(e) => setName(e.target.value)} label="Dog's Name" />
                            </FormControl>
                        </div>
                    )}

                    {activeStep === 3 && (
                        <div>
                            <FormControl margin='dense' sx={{ m: 1, minWidth: 150 }}>
                                <InputLabel>Dog's Age</InputLabel>
                                <MuiSelect value={age} onChange={(e) => setAge(e.target.value)} label="Dog's Age">
                                    {ageOptions.map(ageOption => <MenuItem value={ageOption}>{ageOption}</MenuItem>)}
                                </MuiSelect>
                            </FormControl>
                        </div>
                    )}

                    {activeStep === 4 && (
                        <div>
                            <FormControl margin='dense'>
                                <Autocomplete
                                    disablePortal
                                    sx={{ width: 300 }}
                                    value={color}
                                    onChange={(e, newValue) => setColor(newValue)}
                                    inputValue={colorInput}
                                    onInputChange={(e, newInputValue) => setColorInput(newInputValue)}
                                    options={colors}
                                    renderInput={(params) => <TextField {...params} label="Dog's Color/Markings" />} />
                            </FormControl>
                        </div>
                    )}

                    {activeStep === 5 && (
                        <div>
                            <FormControl margin='dense' sx={{ m: 1, minWidth: 150 }}>
                                <InputLabel>Dog's Gender</InputLabel>
                                <MuiSelect value={gender} onChange={(e) => setGender(e.target.value)} label="Dog's Gender">
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Unknown">Unknown</MenuItem>
                                </MuiSelect>
                            </FormControl>
                        </div>
                    )}

                    {activeStep === 6 && (
                        <div>
                            <FormControl margin='dense' sx={{ m: 1, minWidth: 400 }}>
                                <TextField placeholder="Does Anything Stand Out About This Dog's Appearance?" label="Dog's Features" multiline rows={4} value={features} onChange={(e) => setFeatures(e.target.value)} />
                            </FormControl>
                        </div>
                    )}

                    {activeStep === 7 && (
                        <div>
                            <FormControl margin='dense' sx={{ m: 1, minWidth: 400 }}>
                                <TextField placeholder="How Does This Dog Behave?" label="Dog's Demeanor" multiline rows={4} value={demeanor} onChange={(e) => setDemeanor(e.target.value)} />
                            </FormControl>
                        </div>
                    )}

                    {activeStep === 8 && (
                        <div>
                            <ReportAnalyzeImage addPhoto={addPhoto} breeds={props.breeds} allowPhoto={allowPhoto} />
                        </div>
                    )}
                    {activeStep === 9 && (
                        <div>
                            <p>{isSubmitEnabled ? "Would you like to let the world know about this dog?" : "Please complete all fields before submitting"}</p>
                            <input type="submit" value="Submit New Report" disabled={!isSubmitEnabled} />
                        </div>
                    )}
                    <div style={{marginTop: "3vh"}}>

                    <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        >Back
                    </Button>
                    <Button onClick={handleNext}
                        disabled={!stateArray[activeStep] || !lat}
                        >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                            </div>
            </Grid>
            </Grid>
                </form>
            </Box>
    )
}


const mapStateToProps = (state) => ({
    breeds: state.breeds.breeds,
    loading: state.breeds.loading,
    currentLocation: state.user.currentLocation,
    geolocating: state.user.geolocating,
    user: state.user
})

export default connect(mapStateToProps, { createReport, getBreeds, reportFormChange, reportFormSelectChange, reportFormImageChange, setGeolocatedLocation })(ReportForm)
