import { Request, Response } from "express";

import { 
  countGames,
  createGame, 
  deleteGame,
  getGameByName, 
  getGameBySlug, 
  listGames, 
  updateGame 
} from "../model/Game";
import generateSlug from "../utils/generateSlug";
import AppError from "../errors/AppError";

export const index = (request: Request, response: Response) => {
  const page = Number(request.query.page);
  const limit = Number(request.query.limit);
  const total = countGames();
  response.send({ games: listGames(page, limit), total});
};

export const create = async (request: Request, response: Response) => {
  const { 
    name,
    platform, 
    genre, 
    releaseDate, 
    numOfPlayers, 
    publisher,
    boxArt,
  } = request.body;

  try {

    const existingGame = getGameByName(name);

    if (existingGame) {
      response.status(400).send({message: "this game already exists on library"});
      return;
    }

    const slug = await generateSlug(`${platform} ${name}`);

    const newGame = createGame({ 
      name,
      platform, 
      genre, 
      releaseDate, 
      numOfPlayers, 
      publisher, 
      boxArt,
      slug,
    });

    delete newGame.id;

    response.status(201).send(newGame);
  } catch (err) {
    
  }
};

export const edit = async (request: Request, response: Response) => {
  const { slug } = request.params;

  const game = getGameBySlug(slug);

  if (!game) {
    throw new AppError('Game not found in the library.', 401);
  }

  const updatedGame = updateGame({ ...game, ...request.body });

  delete updatedGame.id;

  return response.json(updatedGame);
};

const _delete = async (request: Request, response: Response) => {
  const { slug } = request.params;

  const game = getGameBySlug(slug);

  deleteGame(game.id);

  response.status(204).send();
};

export const detail = (request: Request, response: Response) => {
  const { slug } = request.params;

  const foundGame = getGameBySlug(slug);

  delete foundGame.id;

  response.send(foundGame);
};

export { _delete as delete };
