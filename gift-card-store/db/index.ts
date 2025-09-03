import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

const db = drizzle(process.env.NEXT_PUBLIC_DATABASE_URL!);
console.log("Database URL:", process.env.NEXT_PUBLIC_DATABASE_URL);
