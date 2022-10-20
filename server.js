const express = require('express');
const colors = require('colors');
const userRoutes = require('./routes/users')
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config({path: './config/config.env'});
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/v1/users', userRoutes);
app.get('/', (req, res)=>{
    res.json({ success: true, message: "API is Working"})
})

const port = process.env.PORT || 8000;
const server = app.listen(port, console.log(`Server is running on port ${port}`));

//handle unHandled promise rejections
process.on('unhandledRejection', (err, promise)=>{
    console.log(`Error: ${err.message}`.red.bold);
    //close server and exit process
    server.close(()=>process.exit(1))
  })