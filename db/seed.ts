import { PrismaClient } from "@prisma/client";
import sampleData from "./sample-data";

async function main() {
	const prisma = new PrismaClient();
	await prisma.products.deleteMany();
	await prisma.products.createMany({ data: sampleData.products });
	console.log("Database seeded successfully!");
}
main();
