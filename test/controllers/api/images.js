describe("upload images", () => {
  it.skip("should month ", () => {
    const result = require("../../../src/controllers/api/images")();

    expect(result).toBe("01");
  });

  it.skip('should year', () => {
    const result = require("../../../src/controllers/api/images")();

    expect(result).toBe("2023");
  });

  it.skip('should folder', () => {
    const result = require("../../../src/controllers/api/images")();

    expect(result).toBe("D:\\Pemrogramman\\projects\\kiracemes\\public\\content\\images\\2023\\01")
  });

  it('should uniqueSuffix', () => {
    const result = require("../../../src/controllers/api/images")();

    expect(result).toBe(false);
  });
});
