import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===
export const rsvps = pgTable("rsvps", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  attending: boolean("attending").notNull(),
  guestCount: integer("guest_count").notNull().default(1),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

// === BASE SCHEMAS ===
export const insertRsvpSchema = createInsertSchema(rsvps).omit({ id: true, createdAt: true });

// === EXPLICIT API CONTRACT TYPES ===
export type Rsvp = typeof rsvps.$inferSelect;
export type InsertRsvp = z.infer<typeof insertRsvpSchema>;

export type CreateRsvpRequest = InsertRsvp;
export type RsvpResponse = Rsvp;
export type RsvpListResponse = Rsvp[];
