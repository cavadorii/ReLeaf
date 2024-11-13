// controllers/predictController.js

const tf = require('@tensorflow/tfjs-node');
const sharp = require('sharp');
const { TreePhoto } = require('../models/tree_photo');

let model;

// Load model when server starts
async function loadModel() {
    model = await tf.loadLayersModel('');
    console.log("Model loaded successfully.");
}
loadModel();

async function predictTreePresence(imagePath) {
    const imageBuffer = await sharp(imagePath)
        .resize({ width: 256, height: 256 })
        .toBuffer();

    const tensor = tf.node.decodeImage(imageBuffer)
        .expandDims(0)
        .div(tf.scalar(255.0));

    const prediction = model.predict(tensor);
    const [treeProb] = prediction.dataSync();

    return treeProb > 0.5; // Return true if tree is detected
}

async function handleTreePhotoPrediction(req, res) {
    try {
        const imagePath = req.file.path;
        const hasTree = await predictTreePresence(imagePath);

        const treePhoto = new TreePhoto({
            registration_id: req.body.registration_id,
            user_id: req.body.user_id,
            event_id: req.body.event_id,
            photo_url: imagePath,
            is_valid: hasTree
        });

        await treePhoto.save();
        res.json({ message: "Tree photo processed successfully", hasTree });
    } catch (error) {
        console.error("Prediction error:", error);
        res.status(500).json({ error: "Error processing tree photo" });
    }
}

module.exports = {
    handleTreePhotoPrediction
};
