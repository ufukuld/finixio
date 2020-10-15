import React, { Component } from 'react';
import './App.css';
import ApiService from './ApiService'

class App extends Component {

  constructor(props) {
    super(props)

    this.state  = {
      currencies: []
    }
    
    this.getPrices = this.getPrices.bind(this)
  }

  componentDidMount() {
    this.getPrices();
  }

  getPrices() {
    ApiService.getPrices()
      .then(
        (response) => {
          this.setState({ currencies: response.data.RAW })
        }
      )
  }

  getIncrease = (current, opening) => {
    var difference = current - opening;
    return ((difference / opening) * 100).toFixed(3) + "% ($" + difference.toFixed(2) + ")"
  };

  render () {
    return (
      <div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Coin Name</th>
                <th>Current Price (USD)</th>
                <th>Opening Price (USD)</th>
                <th>Price Increase</th>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(this.state.currencies).map(
                  currency =>
                    <tr className="table">
                      <td>{this.state.currencies[currency].USD.FROMSYMBOL}</td>
                      <td>{this.state.currencies[currency].USD.PRICE.toFixed(2)}</td>
                      <td>{this.state.currencies[currency].USD.OPENDAY.toFixed(2)}</td>
                      <td>{this.getIncrease(this.state.currencies[currency].USD.PRICE, 
                                            this.state.currencies[currency].USD.OPENDAY)}</td>
                    </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
