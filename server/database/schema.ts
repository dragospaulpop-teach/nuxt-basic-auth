import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  avatar: text("avatar").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

const userInsertSchema = createInsertSchema(users, {
  firstName: z
    .string({ required_error: "Prenumele este obligatoriu!" })
    .min(10, { message: "Prenumele trebuie sa aiba minim 10 caractere!" }),
  lastName: z
    .string({ required_error: "Numele este obligatoriu!" })
    .min(10, { message: "Numele trebuie sa aiba minim 10 caractere!" }),
  email: z
    .string({ required_error: "Adresa de email este obligatorie!" })
    .email({ message: "Adresa de email este invalida!" }),
  password: z
    .string({ required_error: "Parola este obligatorie!" })
    .min(8, { message: "Parola trebuie sa aiba minim 8 caractere!" }),
  avatar: z.string({ required_error: "Avatarul este obligatoriu!" }),
  createdAt: z.date(),
});

const userSelectSchema = createSelectSchema(users);

export { userInsertSchema, userSelectSchema };
