import { pgTable, serial } from "drizzle-orm/pg-core";

export const Bids = pgTable("Bids", {
  id: serial("id").primaryKey(),
});
