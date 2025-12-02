import axios from 'axios';
const newRequest = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
})
export default newRequest