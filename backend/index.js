const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const app = express();
const port = 5001;
const mongoDB = require("./db")
const cors = require('cors')

mongoDB();

app.use(cors())

app.use(express.json());
app.use('/api', require('./Routes/User'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));

app.get('/', (req, res) =>{
    res.send("Hello World");
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})