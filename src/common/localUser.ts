// Function to set user data in localStorage
export function set(user: object) {
    localStorage.setItem("user", JSON.stringify(user)) // Convert user object to JSON and store it in localStorage with key "user"
}

// Function to get user data from localStorage
export function get(key?: string) {
    const localUser = JSON.parse(localStorage.getItem("user") as string) // Retrieve user data from localStorage and parse it as JSON

    return localUser && key ? localUser[key] : localUser // If key is provided, return the corresponding value from user data, otherwise return the entire user data
}