const settings = require("../../src/utils/settings");

describe("test setting", () => {
  it("should setting object", async () => {
    const setting = await settings();
    const dataType = typeof setting === "object"

    expect(dataType).toBe(true);
  });
});
