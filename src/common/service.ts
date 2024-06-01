import * as request from "./request" // Importing the request module for making HTTP requests
import * as i from "./interfaces" // Importing interfaces for type safety
const url = "http://localhost:3030" // Base URL for the API

// Function to read data from the base URL
export function readData() {
    return request.get(url)
}

// Function to register a new user
export function register(data: object) {
    return request.post(`${url}/users/register`, data)
}

// Function to log in a user
export function login(data: object) {
    return request.post(`${url}/users/login`, data)
}

// Function to log out a user
export function logout(data: object) {
    return request.post(`${url}/users/logout`, data)
}

// Function to retrieve user data
export function readUsers() {
    return request.get(`${url}/users`)
}

// Function to update user data
export function updateUser(user: i.User) {
    return request.put(`${url}/users/${user._id}`, user)
}