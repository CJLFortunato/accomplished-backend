const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');

const {
    errorHandler
} = require('./Middlewares/errorMiddleware');
const {
    connectDB
} = require('./Config/db');

const port = process.env.PORT || 5000;

connectDB();
const app = express();


app.use(express.json())
app.use(express.urlencoded({
    extended: false
}));


app.use('/api/goals', require('./Routes/goalRoutes'));
app.use('/api/users', require('./Routes/userRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));