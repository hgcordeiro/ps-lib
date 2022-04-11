import slugify from "slugify"

import generateHash from "./generateHash";

const generateSlug = async (payload: string): Promise<string> => {
console.log("🚀 ~ file: generateSlug.ts ~ line 6 ~ generateSlug ~ payload", payload)
  const options = {
    lower: true,
    strict: false,
  }

  const hashedPayload = await generateHash(payload);

  const slug = slugify(`${payload} ${hashedPayload}`, options);

  return slug;
}

export default generateSlug;
