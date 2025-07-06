const express = require('express')
const app = express();
const port = 5001;
const mongoDB = require("./db")

mongoDB();

app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

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