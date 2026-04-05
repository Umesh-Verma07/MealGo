const mongoose = require('mongoose')
const mongoURI = process.env.DB_URL

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully');

        const db = mongoose.connection.db;
        const foodItems = await db.collection("food_items").find({}).toArray();
        const foodCategory = await db.collection("food_category").find({}).toArray();

        global.food_items = foodItems;
        global.food_category = foodCategory;

    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
}


module.exports = mongoDB

