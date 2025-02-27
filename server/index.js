const express = require('express')
const app = express();
const router = require("./routes/router")
const cors = require('cors')

app.use(cors());
app.use(express.json());
app.use(router)

app.get('/',(req,res)=>res.send('<h1>Home Page</h1>'))
app.listen(3000,()=>console.log('App Listening at PORT 3000'));
