import ProductCard from "./product-card";
import { Products } from "@/types";
const productList = ({
	data,
	title,
	limit,
}: {
	data: Products[];
	title?: string;
	limit?: number;
}) => {
	const limitedData = limit ? data.slice(0, 4) : data;
	return (
		<div className="my-10">
			<h2 className="h2-bold md-4">{title}</h2>
			{data.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{limitedData.map((product: Products) => (
						<ProductCard key={product.slug} product={product} />
					))}
				</div>
			) : (
				<div>
					<p>No products found</p>
				</div>
			)}
		</div>
	);
};

export default productList;
