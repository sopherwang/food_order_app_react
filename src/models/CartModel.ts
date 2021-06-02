class CartModel {
    id: string
    name: string
    amount: number
    price: number

    constructor(id: string, name: string, amount: number, price: number) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.price = price;
    }
}

export default CartModel