export function set(user: object) {
    localStorage.setItem("user", JSON.stringify(user))
}

export function get(key?: string) {
    const localUser = JSON.parse(localStorage.getItem("user") as string)

    return localUser && key ? localUser[key] : localUser
}