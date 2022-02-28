import { ComputerVisionClient } from '@azure/cognitiveservices-computervision';
import { ApiKeyCredentials } from '@azure/ms-rest-js';

const key = process.env.REACT_APP_A1_API_KEY;
const endpoint = process.env.REACT_APP_ENDPOINT;

const visualFeatures = [
    "ImageType",
    "Faces",
    "Adult",
    "Categories",
    "Color",
    "Tags",
    "Description",
    "Objects",
    "Brands"
]

export const isConfigured = () => {
    const result = (key && endpoint && (key.length > 0) && (endpoint.length > 0)) ? true : false;

    return result;
}

export const computerVision = async (attachment) => {

    const computerVisionClient = new ComputerVisionClient(
        new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key, 'Content-Type': 'application/json' } }), endpoint)
    
    const analysis = await computerVisionClient.analyzeImage(attachment, { visualFeatures })
    
    return analysis
}
