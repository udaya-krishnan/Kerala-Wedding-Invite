import { db } from "./db";
import {
  rsvps,
  type InsertRsvp,
  type Rsvp
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getRsvps(): Promise<Rsvp[]>;
  createRsvp(rsvp: InsertRsvp): Promise<Rsvp>;
}

export class DatabaseStorage implements IStorage {
  async getRsvps(): Promise<Rsvp[]> {
    return await db.select().from(rsvps);
  }

  async createRsvp(rsvp: InsertRsvp): Promise<Rsvp> {
    const [created] = await db.insert(rsvps)
      .values(rsvp)
      .returning();
    return created;
  }
}

export const storage = new DatabaseStorage();
