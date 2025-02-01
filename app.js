const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const faqRouter = require('./routes/routesFaq');
dotenv.config({path: "./config.env"});
const app = express();

app.use(express.json());


const db = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose.connect(db).then(() => {
    
    console.log("Connected to MongoDB");
});

app.use("/api/faqs",faqRouter);

app.listen(process.env.PORT , () => {
    console.log(`Server running on port ${process.env.PORT}`);
});