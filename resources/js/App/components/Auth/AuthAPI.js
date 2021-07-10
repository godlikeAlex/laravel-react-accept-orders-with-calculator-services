import axios from "axios"

export const login = async (data) => {
    return await axios({
        method: 'POST',
        url: '/api/login',
        data,
        headers: { 'Content-type': 'application/json' }
    })
}

export const signup = async (data) => {
    return await axios({
        method: 'POST',
        url: '/api/register',
        data,
        headers: { 'Content-type': 'application/json' }
    });
}