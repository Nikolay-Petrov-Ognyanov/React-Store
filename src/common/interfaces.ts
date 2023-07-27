export interface User {
    value?: object | null | undefined
    _id?: string,
    accessToken?: string,
    purchases?: Purchase
    username?: string,
}

export interface Category {
    name: string,
    amount: number,
    price: number
}

export interface CardProps {
    category: Category
}

export interface Cart {
    value?: object | null,
    fruits?: {
        amount: number,
        price: number
    },
    vegetables?: {
        amount: number,
        price: number
    },
    grains?: {
        amount: number,
        price: number
    },
    beans?: {
        amount: number,
        price: number
    },
    mushrooms?: {
        amount: number,
        price: number
    },
}

export interface Purchase {
    fruits: number,
    vegetables: number
    grains: number,
    beans: number,
    mushrooms: number,
}