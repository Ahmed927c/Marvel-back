const axios = require('axios');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
// const mongoose = require('mongoose');

//
app.use(cors());
app.use(express.json());

app.get('/comics', async (req, res) => {
    try {
        let title = '';
        if (req.query.title) {
            title = req.query.title;
        }
        let skip = 0;
        if (req.query.skip) {
            skip = req.query.skip;
        }
        const response = await axios.get(
            // get the  comics from the api limit to 100 results and offset to 0 
            `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}&title=${title}&limit=100&skip=${skip}`,
        );

        res.status(200).json(response.data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/comics/:characterId', async (req, res) => {
    try {
        const characterId= req.params.id;
        // if( !mongoose.Types.ObjectId.isValid(id) ) return false;
        const response = await axios.get(
            `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${process.env.MARVEL_API_KEY}`,
        );
       
        res.json(response.data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/', async (req, res) => {
    try {
        let name = '';
        if (req.query.name) {
            title = req.query.name;
        }
        let skip = 0;
        if (req.query.skip) {
            skip = req.query.skip;
        }
        const response = await axios.get(
            `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}&name=${name}&limit=100&skip=${skip}`,
        );

        res.status(200).json(response.data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get ("/character/:characterId", async (req, res) => {
    try {
        const characterId = req.params.characterId;
        const response = await axios.get( `https://lereacteur-marvel-api.herokuapp.com/character/${characterId}?apiKey=${process.env.MARVEL_API_KEY}`,
        );
        res.status(200).json(response.data);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

app.all('*', (req, res) => {
    console.log('in lost routes');
    res.status(404).json({ massege: 'page not found' });
});

app.listen(process.env.PORT || 4100, () => {
    console.log('server is running');
});
