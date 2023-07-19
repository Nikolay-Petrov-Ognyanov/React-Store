// import * as localUser from "./localUser"

async function requester(
    url: RequestInfo | URL,
    method: string,
    data?: object | string | number
) {
    // const accessToken = localUser.get("accessToken")

    const headers = {}

    // if (accessToken) { headers["X-Authorization"] = accessToken }

    function makeRequest(
        url: RequestInfo | URL,
        method: string,
        data?: object | string | number
    ) {
        if (method === "GET") {
            return fetch(url)
        } else {
            return fetch(url, {
                method,
                headers: {
                    ...headers,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
        }
    }

    try {
        const response = await makeRequest(url, method, data)

        if (response.ok) {
            const result = await response.json()

            return result
        } else {
            const error = await response.json()

            return error.message
        }
    } catch (error) {
        console.log(error)
    }
}

export function get(url: string) { return requester(url, "GET") }
export function post(url: string, data: object) { return requester(url, "POST", data) }
export function put(url: string, data: object) { return requester(url, "PUT", data) }
export function del(url: string) { return requester(url, "DELETE") }