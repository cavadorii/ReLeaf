const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();


const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
  connectTimeoutMS: 30000, 
  serverSelectionTimeoutMS: 30000 ,
  socketTimeoutMS:30000
});


async function connectDB() {
  try {
    await client.connect();
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
}

module.exports = { client, connectDB };
