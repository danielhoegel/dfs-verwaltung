import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4444/api';
axios.defaults.headers['Content-Type'] = 'application/json';

export default function apiRequest(url, options) {
    return axios({ url, ...options })
        .then(res => {
            if (res.status >= 200 && res.status < 300) {
                return res.data;
            }
            return null;
        });
}
