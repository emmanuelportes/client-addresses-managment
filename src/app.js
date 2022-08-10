const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();

const pool  = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: proccess.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

app.use(express.json());
app.use(express.urlencoded({ 
    extended:true
 }));

app.post('/', (request, response) => {
    response.send(request.body);
});

app.listen(process.env.PORT, ()=>{
    console.log(`server running on port: ${PORT}`);
});














