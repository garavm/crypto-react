import React from 'react';
import numeral from 'numeral';
import { getCryptoData } from '../api/api';

const css = require('./CryptoCcyList.css');

export default class CryptoCcyList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            value: 'SGD'
        };
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {
        getCryptoData()
            .then(responseJson => {
                this.setState({
                    data: responseJson
                })
                console.log(this.state.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleChange(event) {
        this.setState({ value: event.target.value },()=>{
            
        });
        // alert('Your favorite flavor is: ' + this.state.value);
    }
    render() {
        const { data, value } = this.state;
        return (
            <div>
                <select value={this.state.value} onChange={this.handleChange}>
                    <option value="SGD">SGD</option>
                    <option value="AUD">AUD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="USD">USD</option>
                    <option value="VND">VND</option>
                </select>
                {
                    data.map((item) => {
                        return (
                            <div className={css.cryptoRow} key={item.id}>
                                <div className={css.cryptoName}>{item.name}</div>
                                <div className={css.cryptoPrice}>{`${value} ${numeral(value === 'SGD' ?item.price_sgd : item.price_usd).format('0,0.00')}`}</div>
                                <div className={css.cryptoChange} style={{backgroundColor: item.percent_change_24h >= 0 ? 'green' : 'red'}}>{`${item.percent_change_24h}%`}</div>
                            </div>
                        );
                    })
                }
            </div>

        );
    }
}
