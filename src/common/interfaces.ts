export interface User {
    value?: object | null
    _id?: string,
    accessToken?: string
}

export interface Category {
    title: string,
    amount: number,
    unit: string,
    price: number
}

export interface CardProps{
    category: Category
}