import { PSPlatform } from "../types/PSPlatform";

export default interface GameDTO {
  name: string;
  platform: PSPlatform;
  genre: string;
  releaseDate: Date;
  numOfPlayers: number;
  publisher: string;
  boxArt?: string;
  slug: string;
}
