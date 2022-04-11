import { PSPlatform } from "./PSPlatform";

interface IGame {
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

export default IGame;
