import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

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

const update = async (id, newObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, newObject)
    return response.data
}

const addComment = async (id, comment) => {
    const config = {
        headers: { Authorization: token },
    }
    console.log("comment in blogs.js: ", comment)
    console.log("blog id in blogs.js: ", id)
    const response = await axios.post(`${baseUrl}/${id}/comments`, { comments: comment }, config)
    console.log("response in blogs.js: ", response)
    return response.data
}

const remove = async (id) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

const getAll = () => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

export default { getAll, setToken, create, update, remove, addComment }
