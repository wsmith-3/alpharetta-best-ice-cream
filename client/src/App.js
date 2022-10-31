import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  const [iceCreamShops, setIceCreamShops] = useState([]);
  const [city] = useState('Alpharetta');
  const [randomPhoto, setRandomPhoto] = useState(null);
  const [shopReview, setShopReview] = useState();

  useEffect(() => {
   getRandomPhoto();
   getTop5();
  },[]);

  const getTop5 = () => {
    axios.get(`/api/top5/${city}`)
    .then((res) => {
      if(res.data && res.data.businesses) setIceCreamShops(res.data.businesses);
    })
    .catch((err) => console.log(err))
  }

  const getRandomPhoto = () => {
    axios.get('/api/random-photo')
    .then((res) => {
      if(res.data) setRandomPhoto(res.data);
    })
    .catch((err) => console.log(err))
  }

  const getReview = (id) => {
    axios.get(`/api/reviews/${id}`)
    .then((res) => {
      if(res.data && res.data.reviews) {
        const review = res.data.reviews[0]
        console.log(review)
          setShopReview({id, review: review.text, user: review.user.name})
         
      }
    })
    .catch((err) => console.log(err))
  }
  console.log('Here is the top 5 ice cream shops: ', iceCreamShops);
  console.log('Did we get a random photo: ', randomPhoto);
  console.log('here is the reviews : ', shopReview)
  return (
    <div className="App">
      <header className="App-header">
        <img src={randomPhoto && randomPhoto.urls.small} className="App-logo" alt="logo" />
        <p>
          A list of {city}'s best ice cream 
        </p>
      </header>
      {iceCreamShops.length && iceCreamShops.map(shop => {
        return (
          <div className='box' key={shop.id}>
            <span className='title is-4'>{shop.name}</span>
            <div className='is-pulled-right'>
                <button className='button is-small ' onClick={() => getReview(shop.id)}>Review</button>
            </div>
            {shopReview && shopReview.id === shop.id && 
              <>
                <h3><strong>Review by: {shopReview.user}</strong></h3>  
                <p> "<i>{shopReview.review}</i>"</p>
              </>
              
            }
          </div>
          )
      })}
    </div>
  );
}

export default App;
