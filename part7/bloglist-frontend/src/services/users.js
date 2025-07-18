import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

let token = null

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

const create = async (newObject) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}


const getAll = () => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

export default { getAll, setToken, create }
