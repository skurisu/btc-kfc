import React, { Component } from 'react';
import './App.css';
import friedChickenBucket from './images/friedchickenbucket.svg';
import friedChickenBucket2 from './images/friedchickenbucket_100.svg';

class App extends Component {
  state = {
    buckets: 0
  };
  componentDidMount() {
    this.intervalId = setInterval(() => this.setBucketsToState(), 1000);
    this.setBucketsToState();
  }

  setBucketsToState = () => {
    this.getNumFriedChickenBuckets().then(buckets => {
      console.log(buckets);
      this.setState({ buckets });
    });
  };

  getNumFriedChickenBuckets() {
    return fetch('https://api.gdax.com/products/BTC-USD/ticker')
      .then(response => response.json())
      .then(data => {
        const bitcoinPrice = data.price;
        const kfcTwelvePieceBucket = 20.49;
        const numFriedChickenBuckets = (
          bitcoinPrice / kfcTwelvePieceBucket
        ).toFixed(4);

        return numFriedChickenBuckets;
      });
  }

  render() {
    return (
      <div className="App">
        <h1 className="main-text">BTC-KFC</h1>
        <img src={friedChickenBucket} />
        <p>{this.state.buckets}</p>
      </div>
    );
  }
}

export default App;
