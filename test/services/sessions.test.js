const session = require("../../src/services/sessions");

test("should token", () => {
  process.env.NODE_ENV = "development";

  const body = {
    username: "admin",
    password: "123",
  };

  const result = session.create(body);

  expect(result).toBe("token");
});
