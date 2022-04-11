import generateHash from "./generateHash";


describe("generateHash", () => {
  it("should be able to generate hash from a string", async () => {
    const stringTest = "Test";

    const generatedHash = await generateHash(stringTest);

    expect(typeof generatedHash).toBe("string");
  });
});