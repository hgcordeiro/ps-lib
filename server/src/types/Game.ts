import { PSPlatform } from "./PSPlatform";

export type Game = {
  id: string;
  slug: string;
  name: string;
  platform: PSPlatform;
  genre: string;
  releaseDate: Date;
  numOfPlayers: number;
  publisher: string;
  boxArt?: string;
}
