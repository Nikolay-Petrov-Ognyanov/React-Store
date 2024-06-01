// Interface for a user
export interface User {
    value?: object | null | undefined // Value property can be an object, null, or undefined
    _id?: string, // User ID
    accessToken?: string, // Access token
    purchases?: Purchase // User's purchases
    username?: string, // Username
}

// Interface for a category
export interface Category {
    name: string, // Category name
    amount: number, // Amount
    price: number // Price
}

// Props interface for a Card component
export interface CardProps {
    category: Category // Category details for the card
}

// Interface for a cart
export interface Cart {
    value?: object | null, // Value property can be an object or null
    fruits?: { amount: number, price: number }, // Fruits in the cart with amount and price
    vegetables?: { amount: number, price: number }, // Vegetables in the cart with amount and price
    grains?: { amount: number, price: number }, // Grains in the cart with amount and price
    beans?: { amount: number, price: number }, // Beans in the cart with amount and price
    mushrooms?: { amount: number, price: number }, // Mushrooms in the cart with amount and price
}

// Interface for a purchase
export interface Purchase {
    fruits: number, // Number of fruits purchased
    vegetables: number, // Number of vegetables purchased
    grains: number, // Number of grains purchased
    beans: number, // Number of beans purchased
    mushrooms: number, // Number of mushrooms purchased
}