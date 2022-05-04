import { Game } from "../types/Game";
import { v4 as uuidv4 } from 'uuid';
import { PSPlatform } from "../types/PSPlatform";
import GameDTO from "../dtos/GameDTO";

export let games: Game[] = [
  {
    id: "cdef5487-6170-4ac0-a002-0c0e8a5c91f5",
    slug: "ps1-final-fantasy-vii",
    name: "Final Fantasy VII",
    platform: PSPlatform.PS1,
    genre: "RPG",
    releaseDate: new Date("1997-01-31"),
    numOfPlayers: 1,
    publisher: "Square Enix",
    boxArt: "https://www.gamesdatabase.org/Media/SYSTEM/Sony_Playstation/Box/big/Final_Fantasy_VII_-_1997_-_Sony_Computer_Entertainment.jpg",
  },
  {
    id: "af895487-6170-4ac0-a002-0c0e8a5c91fd4",
    slug: "ps1-metal-gear-solid",
    name: "Metal Gear Solid",
    platform: PSPlatform.PS1,
    genre: "Tactical Espionage Action",
    releaseDate: new Date("1998-09-03"),
    numOfPlayers: 1,
    publisher: "Konami",
    boxArt: "https://www.covercentury.com/covers/psx/m/Metal-Gear-Solid-NTSC-PSX-FRONT.jpg",
  },
  {
    id: "bd955487-8170-4ac0-a002-0c0e8a5c91fd4",
    slug: "ps4-death-stranding",
    name: "Death Stranding",
    platform: PSPlatform.PS4,
    genre: "Action",
    releaseDate: new Date("2019-11-08"),
    numOfPlayers: 1,
    publisher: "Kojima Productions",
    boxArt: "https://m.media-amazon.com/images/I/81B7-Rbae3L._AC_SL1500_.jpg",
  },
  {
    id: "bd955487-8650-4ac0-a002-0c0e8a5c91fd4",
    slug: "ps3-metal-gear-solid-4",
    name: "Metal Gear Solid 4",
    platform: PSPlatform.PS3,
    genre: "Tactical Espionage Action",
    releaseDate: new Date("2019-11-08"),
    numOfPlayers: 1,
    publisher: "Konami",
    boxArt: "https://upload.wikimedia.org/wikipedia/pt/a/ab/Metal_Gear_Solid_4_Guns_of_The_Patriot_-_North-american_cover.jpg",
  },
  {
    id: "bd955487-8650-4bd0-a002-0c0e8a5c91fd4",
    slug: "ps4-street-fighter-v",
    name: "Street Fighter V",
    platform: PSPlatform.PS4,
    genre: "Fighting",
    releaseDate: new Date("2016-02-16"),
    numOfPlayers: 1,
    publisher: "Capcom",
    boxArt: "https://media.gamestop.com/i/gamestop/10122417/Street-Fighter-V---PlayStation-4",
  },
];

export const createGame = ({
  name, 
  platform, 
  genre, 
  releaseDate, 
  numOfPlayers, 
  publisher, 
  boxArt,
  slug,
}: GameDTO): Game => {
  const newGame = {
    id: uuidv4(),
    name,
    slug,
    platform, 
    genre, 
    releaseDate, 
    numOfPlayers, 
    publisher, 
    boxArt 
  };

  games.push(newGame);

  return newGame;
}

export const deleteGame = (id: string) => {
  games = games.filter(game => game.id !== id);

};

export const updateGame = ({
  name,
  platform, 
  genre, 
  releaseDate, 
  numOfPlayers, 
  publisher, 
  boxArt,
  slug
}: Game) => {

  games = games.map(game => {
    if (game.slug === slug) {
      const updatedGame = {
        id: game.id,
        slug: game.slug,
        name: name || game.name,
        platform,
        genre, 
        releaseDate, 
        numOfPlayers: numOfPlayers || game.numOfPlayers, 
        publisher: publisher || game.publisher, 
        boxArt
      }
      return updatedGame;
    }
    return game;
  });

  const updatedGame = games.find(game => game.slug === slug);

  return updatedGame;
};

export const getGameBySlug = (slug: string): Game => {
  const foundGame = games.find(game => game.slug === slug);

  return foundGame;
};

export const getGameByName = (name: string): Game => {
  const foundGame = games.find(game => game.name === name);

  return foundGame;
};

export const listGames = (page: number, limit: number): Game[] => {
  const skipIndex = (page - 1) * limit;
  const lastIndex = skipIndex + limit;

  let gamesWithoutId: Game[] = [];

  if (page && limit) {
    let j = 0;
    for (let i = skipIndex; i < lastIndex && i < games.length; i++) {
      gamesWithoutId[j] = {... games[i], id: undefined };
      j++
    }
  } else {
    gamesWithoutId = games.map(game => {
      return { ...game, id: undefined };
    });
  }
  
  return gamesWithoutId;
};

export const countGames = (): number => {
  return games.length;
}