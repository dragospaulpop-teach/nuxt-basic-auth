import { z } from "zod";

const bodySchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  terms: z.boolean(),
});

export default defineEventHandler(async (event) => {
  const db = useDatabase();

  const { firstName, lastName, email, password, confirmPassword, terms } =
    await readValidatedBody(event, bodySchema.parse);

  if (password !== confirmPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: "Passwords do not match",
    });
  }

  try {
    // check to see if users table exists
    await db.sql`CREATE TABLE IF NOT EXISTS users ("id" uuid PRIMARY KEY DEFAULT gen_random_uuid(), "firstName" TEXT, "lastName" TEXT, "email" TEXT, "password" TEXT)`;

    // check to see if user already exists
    const { rows } = await db.sql`SELECT * FROM users WHERE email = ${email}`;

    if (rows && rows.length > 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "User already exists",
      });
    }

    // hash the password
    const hashedPassword = await hashPassword(password);

    // create user
    await db.sql`INSERT INTO users ("firstName", "lastName", email, password) VALUES (${firstName}, ${lastName}, ${email}, ${hashedPassword})`;

    return {
      message: "User created successfully",
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage:
        error instanceof Error ? error.message : "Internal server error",
    });
  }
});
