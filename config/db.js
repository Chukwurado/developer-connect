const mongoose = require("mongoose");
const config = require("config");

const db = config.get("mongoURI"); //uses the config module to get mongoURI

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log("MongoDB Connected"); //when connected successfully
    } catch (e) {
        console.error(e.message);
        process.exit(1); //Exit process with faliure
    }
};

module.exports = connectDB;
