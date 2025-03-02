import CartTable from "./cart-table";
import { getMyCart } from "@/lib/actions/cart.actions";
import { Metadata } from "next";
export const metadata: Metadata = {
	title: "Shopping Cart",
};
const CartPage = async() => {
    const cart = await getMyCart();
	return (
		<div>
			<CartTable  cart={cart}/>
		</div>
	);
};

export default CartPage;
