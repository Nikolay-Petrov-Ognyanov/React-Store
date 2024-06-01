import * as localUser from "./localUser"

// Function to perform HTTP requests
async function requester(
    url: RequestInfo | URL,
    method: string,
    data?: object | string | number
) {
    // Get the access token from local storage
    const accessToken = localUser.get("accessToken")

    // Initialize headers object
    const headers: { [key: string]: string } = {}

    // If access token is present, add it to the headers
    if (accessToken) { headers["X-Authorization"] = accessToken }

    // Function to make the actual request
    async function makeRequest(
        url: RequestInfo | URL,
        method: string,
        data?: object | string | number
    ) {
        // Perform GET request
        if (method === "GET") {
            return fetch(url)
        } else { // Perform other requests (POST, PUT, DELETE)
            return fetch(url, {
                method,
                headers: {
                    ...headers,
                    "Content-Type": "application/json" // Set content type to JSON
                },
                body: JSON.stringify(data) // Convert data to JSON string for body
            })
        }
    }

    try {
        // Make the request
        const response = await makeRequest(url, method, data)

        // Handle response based on status code
        if (response.status !== 204) { // If response status is not No Content
            if (response.ok) { // If response is successful
                const result = await response.json() // Parse response body as JSON

                return result // Return the result
            } else { // If response is not successful
                const error = await response.json() // Parse response body as JSON

                return error.message // Return the error message
            }
        }
    } catch (error) {
        console.error(error) // Log any errors
    }
}

// HTTP GET method
export function get(url: string) { return requester(url, "GET") }

// HTTP POST method
export function post(url: string, data: object) { return requester(url, "POST", data) }

// HTTP PUT method
export function put(url: string, data: object) { return requester(url, "PUT", data) }

// HTTP DELETE method
export function del(url: string) { return requester(url, "DELETE") }