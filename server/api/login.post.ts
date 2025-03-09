import { z } from "zod";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default defineEventHandler(async (event) => {
  const db = useDatabase();
  const { email, password } = await readValidatedBody(event, bodySchema.parse);

  try {
    const { rows } =
      await db.sql`SELECT * FROM users WHERE email = ${email} limit 1`;

    if (rows && rows.length > 0) {
      const user = rows[0] as User;

      const isPasswordValid = await verifyPassword(user.password, password);

      if (isPasswordValid) {
        await setUserSession(event, {
          user: {
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            admin: false,
          },
        });
        return {};
      } else {
        throw createError({
          statusCode: 401,
          statusMessage: "Bad credentials. Try again.",
        });
      }
    } else {
      throw createError({
        statusCode: 401,
        statusMessage: "User not found. Please register.",
      });
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage:
        error instanceof Error ? error.message : "Internal server error",
    });
  }
});
