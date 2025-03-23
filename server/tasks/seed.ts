export default defineTask({
  meta: {
    name: "db:seed",
    description: "Run database seed task",
  },
  async run() {
    console.log("Running DB seed task...");
    const hashedPassword = await hashPassword("password123");
    const users = [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        password: hashedPassword,
        avatar: "https://example.com/avatar/john.png",
      },
      {
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@example.com",
        password: hashedPassword,
        avatar: "https://example.com/avatar/jane.png",
      },
    ];
    await useDrizzle().insert(tables.users).values(users);
    return { result: "success" };
  },
});
