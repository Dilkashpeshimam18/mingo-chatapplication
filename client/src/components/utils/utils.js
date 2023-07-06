import axios from 'axios';

const token = localStorage.getItem('userToken')

let reqInstance = await axios.create({
    headers: {
        Authorization: token
    }
})

export default reqInstance