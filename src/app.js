const express = require('express');
const { Pool } = require('pg');
require('dotenv').config({path:__dirname + '/configure.env'});

const app = express();

const pool  = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

app.use(express.json());
app.use(express.urlencoded({ 
    extended:true
 }));

 app.get('/', (req, res) => {
    res.send(`${process.env.PORT}`)
 })

app.post('/', (request, response) => {
    response.send(request.body);
});

app.listen(process.env.PORT, ()=>{
    console.log(`server running on port: ${process.env.PORT}`);
});














