import axios from 'axios'
const http = axios.create({
    baseURL: 'https://localhost:44361/api',
    headers: {
        'Content-Type': 'application/json',
        'TokenUsuario': localStorage.getItem('token')
    }
});



export {http}