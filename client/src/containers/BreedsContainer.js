import React, {useEffect, useState} from 'react'
import { connect, useDispatch} from 'react-redux'
import { getBreeds } from '../actions/breedActions'
import { getReports } from '../actions/reportActions'
import BreedShow from '../components/breeds/breedShow'
import Grid from '@mui/material/Grid'
import MuttmapBreeds from '../muttmap-breed-list.png'

const BreedsContainer = (props) => {

    const dispatch = useDispatch()
    
    const [letterFilter, setLetterFilter] = useState('')
    const [groupFilter, setGroupFilter] = useState('')

    const letters = [...Array(26)].map((_, i) => String.fromCharCode('A'.charCodeAt(0) + i))

    const breedGroups = ['Herding', 'Hound', 'Mixed', 'Non-Sporting', 'Sporting', 'Terrier', 'Toy', 'Working']

    
    useEffect(() => {
        getBreeds(dispatch)
    }, [])

    // useEffect(() => {
    //     dispatch(getReports())
    // }, [dispatch])

    const letterFilteredBreeds = (breeds) => {
        if (letterFilter) {
            return breeds.filter(breed => breed.breed.startsWith(letterFilter))
        } else {
            return breeds  
        }
    }

    const groupFilteredBreeds = (breeds) => {
        if (groupFilter) {
            return letterFilteredBreeds(props.breeds).filter(breed => breed.breedGroup == groupFilter)
        } else {
            return letterFilteredBreeds(props.breeds)
        }
    }

    const filteredReports = (breed) => {
       return props.reports.filter(report => report.breed === breed.breed)
    }
    
    const handleLetterReset = (e) => {
        setLetterFilter('')
        document.getElementById('breedLetters').selectedIndex = 0
    }

    const handleGroupReset = (e) => {
        setGroupFilter('')
        document.getElementById('breedGroups').selectedIndex = 0
    }

    return(
        
        <div style={{ paddingTop: "15vh"}}>
            <img src={MuttmapBreeds} width="400"></img> 
            <div>
                <label>Filter By First Letter </label>
                <select id="breedLetters" name="breedLetter" onChange={(e)=>setLetterFilter(e.target.value)}>
                    <option disabled selected value>Select Letter</option>
                    {letters.map(letter => <option value={letter}>{letter}</option>)}
                </select>
                <button onClick={(e)=>handleLetterReset(e)}> Reset Letter Filter</button>
            </div>
            <div>
                <label>Filter by Breed Group </label>
                <select id="breedGroups" name="breedGroup" onChange={(e)=>setGroupFilter(e.target.value)}>
                    <option disabled selected value>Select Breed Group</option>
                    {breedGroups.map(group => <option value={group}>{group}</option>)}    
                </select>
                <button onClick={(e)=>handleGroupReset(e)}> Reset Group Filter</button>  
            </div><br/>
            <Grid container spacing={3}>
                {groupFilteredBreeds(props.breeds).map((breed) => <Grid item xs={3}><BreedShow key={props.id} {...breed} reportData={filteredReports(breed)}/> </Grid>)}
            </Grid>
        </div>
    )
}

const mapStateToProps = (state) => ({
    breeds: state.breeds.breeds,
    reports: state.reports.reports
})

export default connect(mapStateToProps, {getBreeds, getReports})(BreedsContainer)