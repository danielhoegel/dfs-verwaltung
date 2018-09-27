import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3333';
axios.defaults.headers['Content-Type'] = 'application/json';

export default function apiRequest(url, options) {
    return axios({ url, ...options })
        .then(res => {
            if (res.status >= 200 && res.status < 300 ) {
                console.log('[RES]', res);
                return res.data
            } else {
                console.log('[ServerError]', res);
            }
        })
        .catch(err => {
            console.log('[ConnectionError]', err);
        });
}