import axios from 'axios'

class ApiService {
    getPrices() {
        return axios.get('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH,BTC,DASH,REP,ZEC,BCH,LTC,PIVX,NEO,VTC&tsyms=USD');
    }
}

export default new ApiService()