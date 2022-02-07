import React, { useState } from 'react'
import '../../azure.css'
import { computerVision, isConfigured as ComputerVisionIsConfigured } from '../../azure-cognitiveservices-computervision'
import { styled } from '@mui/material/styles'

import Button from '@mui/material/Button'


const ReportAnalyzeImage = ({ photo, handlePhotoUploaded, breeds, addPhoto, allowPhoto }) => {
    const [fileSelected, setFileSelected] = useState(null)
    const [analysis, setAnalysis] = useState(null)
    const [processing, setProcessing] = useState(false)
    const [fileSubmitted, setFileSubmitted] = useState(false)
    const [possibleBreed, setPossibleBreed] = useState('')
    const [imagePreview, setImagePreview] = useState(null)

    const handleQuery = (e) => {
        setProcessing(true)
        setAnalysis(null)
        
        computerVision(fileSelected || null).then((item) => {
            const breedNameArray = breeds.map( breed => breed.breed.toLowerCase() )
            const breedMatch = item.tags.filter(tag => breedNameArray.includes(tag.name.toLowerCase()))
            
            // if "hound", "terrier", etc, they will match with "hound mix", "terrier mix" etc
            // otherwise Unknown Mix

            setAnalysis(item)
            if (!item.tags.find(tag => tag.name == 'dog') || item.adult.isAdultContent || item.adult.isGoryContent || item.adult.isRacyContent ) {
                allowPhoto("disallow")
            } else {
                allowPhoto("allow")
                if ( breedMatch ) {
                    setPossibleBreed(breedMatch[0].name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '))
                }
            }

            setFileSelected("")
            setProcessing(false)
        })

    }

    const DisplayResults = () => {
        return (
            <div>
                {/* <h2>Photo Analysis</h2> */}
                <div>
                    {possibleBreed ? <p>This appears to be a {possibleBreed}</p> : <p>Could not get an exact breed match</p>}
                    {imagePreview && <img style={{maxWidth: '150px'}} src={imagePreview}></img>}
                </div>
            </div>
        )
    }


    const handleChange = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onloadend = function () {
            setFileSelected(reader.result) // this is the base64 encoded dataurl
        }
        reader.readAsDataURL(file)
        setFileSubmitted(true)
        addPhoto(file)
        setImagePreview(fileSelected)
        console.log(imagePreview)
    }

    const Input = styled('input')({
        display: 'none',
      })

    const Analyze = () => {
        return (
            <div>
                <div>
                    {/* <div>
                        <label>Dog's Photo (.JPG/.PNG only)</label> <br/>
                        <input type="file" id="myImage" placeholder="Upload photo" onChange={(e) => handleChange(e)} a accept="image/png, image/jpeg" multiple={false} size="50" />
                        <output id="thumbnail" />
                    </div> */}
                          <label htmlFor="contained-button-file">

                    <Input accept="image/png, image/jpeg" id="contained-button-file"  type="file" onChange={(e) => handleChange(e)}/>
                    <Button variant="contained" component="span">{!fileSubmitted ? "Upload Image" : "Upload Different Photo"}</Button>
                    </label>
                    {!fileSubmitted ? <Button variant="contained" disabled>Confirm and Analyze Photo</Button> : <Button variant="contained" onClick={handleQuery}>Select and Analyze Photo</Button>}
                </div>
                {fileSelected && <img style={{maxWidth: '150px'}} src={fileSelected} />}
                {analysis && <DisplayResults />}
            </div>

        )
    }

    const CantAnalyze = () => {
        return (
            <div>Key and/or endpoint not configured in ./azure-cognitiveservices-computervision.js</div>
        )
    }

    const ready = ComputerVisionIsConfigured()

    return (
        <div>
            {ready ? <Analyze /> : <CantAnalyze />}
        </div>

    )
}

export default ReportAnalyzeImage
