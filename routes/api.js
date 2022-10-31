const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config();

const router = express.Router();

const YELP_FUSION_API = "https://api.yelp.com/v3/businesses";
const UNSPLASH_API = "https://api.unsplash.com/photos"
const API_KEY = process.env.API_KEY;
const ACCESS_KEY = process.env.ACCESS_KEY;

router.get('/top5/:city', async (req, res, next) => {
  // This will return all the data, exposing only the id and action field to the client
  const location = req.params.city || 'Alpharetta';
  const searchQuery = `/search?location=${location}&term="ice cream"&limit=5`;
  try {
    const response = await fetch(YELP_FUSION_API + searchQuery, {
        headers:{
            Authorization: `Bearer ${API_KEY}`
        }
    })
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send({error: 'Error getting response from Yelp'})
  }
});

router.get('/reviews/:id', async (req, res, next) => {
    const id = req.params.id;
    const reviewQuery = `/${id}/reviews`;
    try {
        const response = await fetch(YELP_FUSION_API + reviewQuery, {
            headers: {
                Authorization: `Bearer ${API_KEY}`
            }
        })
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.log(error);
        res.send({error: 'Error retrieving reviews'})
    }
})

router.get('/random-photo', async (req, res, next) => {
    const randomPhotoQuery = '/random?query=ice-cream-shop&orientation=landscape';
    try {
        const response = await fetch(UNSPLASH_API + randomPhotoQuery, {
            headers: {
                "Authorization": `Client-ID ${ACCESS_KEY}`,
              }
        })
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.log(error);
        res.send({error: 'Error retrieving a random photo'});
    }
})

module.exports = router;