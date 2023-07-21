import * as request from "./request"
import * as i from "./interfaces"

const url = "http://localhost:3030"

export function readData() { return request.get(url) }

export function register(data: object) {
    return request.post(`${url}/users/register`, data)
}

export function login(data: object) {
    return request.post(`${url}/users/login`, data)
}

export function logout(data: object) {
    return request.post(`${url}/users/logout`, data)
}

export function readUsers() {
    return request.get(`${url}/users`)
}

export function updateUser(user: i.User) {
    return request.put(`${url}/users/${user._id}`, user)
}