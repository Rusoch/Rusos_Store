"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { CartItem } from "@/types";
import { addItemToCart } from "@/lib/actions/cart.actions";
import { toast } from "sonner";
const AddToCart = ({ item }: { item: CartItem }) => {
	const router = useRouter();
	const handleAddToCart = async () => {
		const res = await addItemToCart(item);
		if (!res.success) {
			toast.error(res.message, {
                dismissible: true,
				style: {
					background: "red",
				},
			});
			return;
		}
		//handle success add to cart
		toast(`${item.name} - ${res.message}`, {
			action: {
				label: "Go To Cart",
				onClick: () => router.push("/cart"),
			},
            dismissible: true,
			//additional options here
		});

		return;
	};

	return (
		<Button className="w-full" type="button" onClick={handleAddToCart}>
		<Plus/>	add to cart
		</Button>
	);
};
export default AddToCart;
