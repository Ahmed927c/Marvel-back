const axios = require('axios');
const express = require('express');
const cors = require('cors');
require("dotenv").config();
const app = express();


//
app.use(cors());
app.use(express.json());

app.get('/comics', async (req, res) => {
    try {
        
        let title = "";
        if (req.query.title) {
            title = req.query.title;
        }
        let skip = 0;
        if (req.query.skip) {
            skip = req.query.skip;
        }
        const response = await axios.get(
              // get the  comics from the api limit to 100 results and offset to 0 results
           `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}&title=${title}&limit=100&skip=${skip}`
            
        );
       
        res.status(200).json(response.data);
    } catch (error) {
        res.status(400).json({ error: error.message });;
    }
});


app.get('/comics/:id', async (req, res) => {
    try {
        const id= req.params.id;
    //    if( !mongoose.Types.ObjectId.isValid(req.params.id) ) return false;
        const response = await axios.get(

            `https://lereacteur-marvel-api.herokuapp.com/comics/${id}?apiKey=${process.env.MARVEL_API_KEY}`
        );
        
        res.json(response.data);
    } catch (error) {
        res.status(400).json({ error: error.message });;
    }
} );

app.listen(process.env.PORT || 4100, () => {
    console.log('server is running');
});