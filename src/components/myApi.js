import axios from 'axios'
export default axios.create({
    baseURL: 'http://www.knautzfamilywi.com/CareFinder-1.0.0/api/hospitals/',
    timeout: 5000,
    headers: {
        'X-API-KEY': '28c59f72bf44111374ccb5cf81b362e8',
        'Accept': 'application/xml'
    }
})