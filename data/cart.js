const cart_string = localStorage.getItem("cart")  

export const cart = cart_string ? JSON.parse(cart_string) : []

