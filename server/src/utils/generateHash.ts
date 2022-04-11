import * as crypto from 'crypto';

const generateHash = async (payload: string): Promise<string> => {
  const hash = crypto.createHash('md5').update(payload).digest("hex");
  
  return hash.substring(0, 8);
}

export default generateHash;
