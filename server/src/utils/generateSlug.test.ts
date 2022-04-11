import generateSlug from "./generateSlug";


describe("generateSlug", () => {
  it("should be able to generate slug from a string", async () => {
    const stringTest = "Test";

    const generatedSlug = await generateSlug(stringTest);

    expect(typeof generatedSlug).toBe("string");
  });
});