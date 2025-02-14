import { insertProductsSchema } from "@/lib/validators";
import { z } from "zod";

export type Products = z.infer<typeof insertProductsSchema> & {
    id: string;
    rating: string;
    createdAt: Date;
}