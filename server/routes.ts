import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Define routes using app.get(), app.post(), etc.
  
  app.get(api.rsvps.list.path, async (req, res) => {
    const allRsvps = await storage.getRsvps();
    res.json(allRsvps);
  });

  app.post(api.rsvps.create.path, async (req, res) => {
    try {
      const input = api.rsvps.create.input.parse(req.body);
      const rsvp = await storage.createRsvp(input);
      res.status(201).json(rsvp);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Basic seed function
  const existingRsvps = await storage.getRsvps();
  if (existingRsvps.length === 0) {
    await storage.createRsvp({
      name: "Rahul Nambiar",
      email: "rahul.test@example.com",
      attending: true,
      guestCount: 2,
      message: "Looking forward to it!"
    });
    await storage.createRsvp({
      name: "Lakshmi Menon",
      email: "lakshmi.test@example.com",
      attending: false,
      guestCount: 1,
      message: "Sorry, I won't be able to make it."
    });
  }

  return httpServer;
}
