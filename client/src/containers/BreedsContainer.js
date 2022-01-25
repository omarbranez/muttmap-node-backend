import React, {useEffect, useState} from 'react'
import { connect, useDispatch} from 'react-redux'
import { getBreeds } from '../actions/breedActions'
import { getReports } from '../actions/reportActions'
import BreedShow from '../components/breeds/breedShow'
import Grid from '@mui/material/Grid'
import MuttmapBreeds from '../muttmap-breed-list.png'

const BreedsContainer = (props) => {

    // allow access to the useDispatch hook
    const dispatch = useDispatch()
    
    // local state for which breeds to display depending on the letter they start with, defaults to empty string
    const [letterFilter, setLetterFilter] = useState('')
    // local state for which breed groups to display, defaults to empty string
    const [groupFilter, setGroupFilter] = useState('')

    // the letters A-Z as an array of strings without having to type each letter
    // for each element in this array, return a string depending on the character code, beginning with A and repeating 26 times for each letter in the alphabet
    const letters = [...Array(26)].map((_, i) => String.fromCharCode('A'.charCodeAt(0) + i))

    // the breed group strings as an array
    const breedGroups = ['Herding', 'Hound', 'Mixed', 'Non-Sporting', 'Sporting', 'Terrier', 'Toy', 'Working']

    
    useEffect(() => {
        // dispatch getBreeds to the reducer when the component mounts, then again if dispatch changes
        dispatch(getBreeds())
    }, [dispatch])

    useEffect(() => {
        // dispatch getReports to the reducer when the component mounts, then again if dispatch changes
        dispatch(getReports())
    }, [dispatch])

    // this is a dependency for groupFilteredBreeds. takes prop.breeds as an argument for breeds from groupFilteredBreeds
    const letterFilteredBreeds = (breeds) => {
        // if letterFilter is any value besides empty string
        if (letterFilter) {
            // return a new breed array with only the breeds that begin with the letter in letterFilter
            return breeds.filter(breed => breed.breed.startsWith(letterFilter))
        } else {
            // otherwise, just return the existing list of breeds
            return breeds  
        }
    }

    // this is what the jsx actually uses.
    const groupFilteredBreeds = (breeds) => {
        // if the group filter is any value besides empty string
        if (groupFilter) {
            // filter the modified breed array in letterFilteredBreeds to only return the breeds whose "group" attribute matches the filter
            return letterFilteredBreeds(props.breeds).filter(breed => breed.breed_group == groupFilter)
        } else {
            // otherwise return the modified (or not) breed array in letterFilteredBreeds
            return letterFilteredBreeds(props.breeds)
        }
    }

    const filteredReports = (breed) => {
        // return an array of reports that involve that breed
       return props.reports.filter(report => report.breed === breed.breed)
    }
    
    const handleLetterReset = (e) => {
        // reset the letterFilter to a null value (empty string)
        setLetterFilter('')
        // reset the selection in the dropdown to the unselectable option 
        document.getElementById('breedLetters').selectedIndex = 0
    }

    const handleGroupReset = (e) => {
        // reset the groupFilter to a null value (empty string)
        setGroupFilter('')
        // reset the selection in the dropdown to the unselectable option 
        document.getElementById('breedGroups').selectedIndex = 0
    }

    return(
        
        <div>
            {/* display imported image with width of 400 pixels */}
            <img src={MuttmapBreeds} width="400"></img> 
            <div>
                {/* label for letter filter */}
                <label>Filter By First Letter </label>
                {/* dropdown box with letters to filter. clicking on a letter sets the local state letterFilter to that letter */}
                <select id="breedLetters" name="breedLetter" onChange={(e)=>setLetterFilter(e.target.value)}>
                    {/* instead of displaying "a" first, display a non-selectable placeholder */}
                    <option disabled selected value>Select Letter</option>
                    {/* map each letter to its own option value in the dropdown */}
                    {letters.map(letter => <option value={letter}>{letter}</option>)}
                </select>
                {/* button that, when clicked, sets the filter back to '' */}
                <button onClick={(e)=>handleLetterReset(e)}> Reset Letter Filter</button>
            </div>
            <div>
                {/* label for breed filter */}
                <label>Filter by Breed Group </label>
                {/* dropdown box with breed types to filter. clicking on a breed type sets the local state groupFilter to that breed group */}
                <select id="breedGroups" name="breedGroup" onChange={(e)=>setGroupFilter(e.target.value)}>
                    {/* instead of displaying "Herding", display a non-selectable placeholder */}
                    <option disabled selected value>Select Breed Group</option>
                    {/* map each breed group to its own option value in the dropdown */}
                    {breedGroups.map(group => <option value={group}>{group}</option>)}    
                </select>
                {/* button that, when clicked, sets the filter back to '' */}
                <button onClick={(e)=>handleGroupReset(e)}> Reset Group Filter</button>  
            </div><br/>
            <Grid container spacing={3}>
                {groupFilteredBreeds(props.breeds).map((breed) => <Grid item xs={3}><BreedShow key={props.dog_id} {...breed} reportData={filteredReports(breed)}/> </Grid>)}
            </Grid>
        </div>
    )
}

const mapStateToProps = (state) => ({
    // make the store's breed array accessible as props
    breeds: state.breeds.breeds,
    // make the store's report array accessible as props
    reports: state.reports.reports
})

// allow this component access to the store with a mapStateToProps function, allow ability to dispatch actions via mapDispatchToProps
export default connect(mapStateToProps, {getBreeds, getReports})(BreedsContainer)