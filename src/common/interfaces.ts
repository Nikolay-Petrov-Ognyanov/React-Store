export interface User {
    value?: object | null
    _id?: string,
    accessToken?: string
}

export interface Category {
    name: string,
    amount: number,
    unit: string,
    price: number
}

export interface CardProps {
    category: Category
}

export interface Cart {
    value?: object | null,
    fruits?: number,
    vegetables?: number,
    grains?: number,
    beans?: number,
    mushrooms?: number,
}