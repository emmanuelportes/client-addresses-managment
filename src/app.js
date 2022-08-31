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

 app.get('/', async(request, response) => {
	try {
		const clients = await pool.query("SELECT clients.client_id, clients.name, clients.lastname, addresses.address FROM clients JOIN addresses ON clients.client_id = addresses.client_id;");
    	response.status(200).json(clients.rows);

	} catch(err){
		console.log(err.stack);
		response.json({"message":"an error just ocurred"})
	}
 });

app.post('/', async(request, response) => {
    try {
        const { name, lastname, addresses } = request.body;
        const result = await pool.query("INSERT INTO clients(name, lastname) VALUES($1, $2) RETURNING client_id;", [name, lastname]);

        for (const address of addresses) { 
            pool.query("INSERT INTO addresses(address, client_id) VALUES($1, $2);", [address, result.rows[0].client_id]);
        };

        response.status(200).json({'message':'client inserted successfully'})

    } catch(err) {
        console.log(err.stack);
        response.status(500).json({"message":"an error just occured"})
    }
});

app.listen(process.env.PORT, ()=>{
    console.log(`server running on port: ${process.env.PORT}`);
});














