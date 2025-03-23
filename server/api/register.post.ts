import { z } from "zod";

const bodySchema = userInsertSchema.extend({
  confirmPassword: z.string().min(8),
  terms: z.boolean(),
});

export default defineEventHandler(async (event) => {
  // const db = useDatabase();

  let firstName, lastName, email, password, confirmPassword, terms;
  try {
    ({ firstName, lastName, email, password, confirmPassword, terms } =
      await readValidatedBody(event, bodySchema.parse));
  } catch (error: any) {
    if (error.statusMessage === "Validation Error") {
      // zod error

      const zodErrors = JSON.parse(error.message);

      throw createError({
        statusCode: 400,
        statusMessage: zodErrors.map((err: any) => err.message).join(" "),
      });
    }
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid request body",
    });
  }

  console.log(firstName, lastName, email, password, confirmPassword, terms);

  if (!terms) {
    throw createError({
      statusCode: 400,
      statusMessage: "You must agree to the terms and conditions",
    });
  }

  if (password !== confirmPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: "Passwords do not match",
    });
  }

  try {
    // check to see if users table exists
    // await db.sql`CREATE TABLE IF NOT EXISTS users ("id" uuid PRIMARY KEY DEFAULT gen_random_uuid(), "firstName" TEXT, "lastName" TEXT, "email" TEXT, "password" TEXT)`;

    // check to see if user already exists
    // const { rows } = await db.sql`SELECT * FROM users WHERE email = ${email}`;
    const rows = await useDrizzle()
      .select()
      .from(tables.users)
      .where(eq(tables.users.email, email));

    if (rows && rows.length > 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "User already exists",
      });
    }

    // hash the password
    const hashedPassword = await hashPassword(password);

    // create user
    // await db.sql`INSERT INTO users ("firstName", "lastName", email, password) VALUES (${firstName}, ${lastName}, ${email}, ${hashedPassword})`;

    await useDrizzle().insert(tables.users).values({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      avatar: "",
      createdAt: new Date(),
    });

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
