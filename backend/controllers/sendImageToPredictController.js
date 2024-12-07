// controllers/sendImageToPredictController.js
const axios = require('axios');
const fs = require('fs'); 
const FormData = require('form-data'); 

async function sendImageToPredictController(imagePath) {
    try {
        const formData = new FormData();
        formData.append('image', fs.createReadStream(imagePath));

        const response = await axios.post('http://localhost:5000/api/predict/predict-tree', formData, {
            headers: {
                ...formData.getHeaders(), 
            },
        });

        console.log('Response from predictController:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error sending image to predictController:', error.message);
        throw error;
    }
}

module.exports = { sendImageToPredictController };