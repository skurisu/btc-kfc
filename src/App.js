import React, { Component } from 'react';
import './App.css';
import friedChickenBucket from './images/friedchickenbucket.svg';

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
        <p className="ticker">{this.state.buckets}</p>
        <span>
          * In USD (based on the price of KFC's 12 piece chicken only bucket)
        </span>
        <img src={friedChickenBucket} alt="Happiest bucket of chicken ever" />
      </div>
    );
  }
}

export default App;