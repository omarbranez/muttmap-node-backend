import React, { useState } from 'react'
import '../../azure.css'
import { computerVision, isConfigured as ComputerVisionIsConfigured } from '../../azure-cognitiveservices-computervision'
import { styled } from '@mui/material/styles'
import axios from 'axios'
import Button from '@mui/material/Button'


const ReportAnalyzeImage = ({ breeds, addPhoto, allowPhoto }) => {
    const [analysis, setAnalysis] = useState(null)
    const [processing, setProcessing] = useState(false)
    const [possibleBreed, setPossibleBreed] = useState('')
    const [attachment, setAttachment] = useState(null)
    const [uploading, setUploading] = useState(false)

    const handleQuery = async(url) => {
        setProcessing(true)
        setAnalysis(null)
        
        console.log(url)
        computerVision(url || null).then((item) => {
            const breedNameArray = breeds.map( breed => breed.name.toLowerCase() )
            const breedMatch = item.tags.filter(tag => breedNameArray.includes(tag.name.toLowerCase()))
            
            // if "hound", "terrier", etc, they will match with "hound mix", "terrier mix" etc
            // otherwise Unknown Mix
            setAnalysis(item)
            console.log(item)
            if (!item.tags.find(tag => tag.name == 'dog') || item.adult.isAdultContent || item.adult.isGoryContent || item.adult.isRacyContent ) {
                allowPhoto("disallow")
            } else {
                allowPhoto("allow")
                if ( breedMatch ) {
                    setPossibleBreed(breedMatch[0].name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '))
                }
                setAttachment(url)
                addPhoto(url)
            }
            setProcessing(false)
        })

    }

    const DisplayResults = () => {
        return (
            <div>
                <div>
                    {possibleBreed ? <p>This appears to be a {possibleBreed}</p> : <p>Could not get an exact breed match</p>}
                </div>
            </div>
        )
    }
  const handleAttachPhotos = async(event) => {
    event.preventDefault()
    addPhoto('')
    setAttachment('')
    setPossibleBreed(null)
    setUploading(true)
    const formData = new FormData()
    const instance = axios.create() 
    const file = event.target.files[0]
      formData.append("file", file, `${process.env.REACT_APP_CLOUDINARY_KEY}`)
      formData.append("upload_preset", "tczwz9ns")
      formData.append("public_id", `${file.name.slice(0, -4)}`)
      formData.append("cloud_name", `${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}`);
      try {
        let res = await instance.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, formData)
        handleQuery(res.data.url)
      }
      catch(error) {
        console.log(error)
      } finally {
        setUploading(false)
      }
  }
    const Input = styled('input')({
        display: 'none',
      })

    const Analyze = () => {
        return (
            <div>
                <div>
                    <label htmlFor="contained-button-file">
                        <Input accept="image/png, image/jpeg" id="contained-button-file"  type="file" onChange={(e) => handleAttachPhotos(e)}/>
                        <Button variant="contained" component="span">{!attachment ? "Upload Image" : "Upload Different Photo"}</Button>
                    </label>
                </div>
                {attachment && <img style={{maxWidth: '150px'}} src={attachment} />}
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
