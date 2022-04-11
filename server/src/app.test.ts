import supertest from "supertest";
import api from "./app";
import { games } from "./model/Game";
import { PSPlatform } from "./types/PSPlatform";

describe("server", () => {
  beforeEach(() => {
    games.length = 0;
  });

  describe("GET /games", () => {
    it("should return an array of games with the existing elements", async () => {
      const id = "cdef5487-6170-4ac0-a002-0c0e8a5c91f5";
      const slug = "ps1-final-fantasy-vii";
      const name = "Final Fantasy VII";
      const platform = PSPlatform.PS1;
      const genre = "RPG";
      const releaseDate = new Date("1997-01-31");
      const numOfPlayers = 1;
      const publisher = "Square Enix";
      const boxArt = "https://www.gamesdatabase.org/Media/SYSTEM/Sony_Playstation/Box/big/Final_Fantasy_VII_-_1997_-_Sony_Computer_Entertainment.jpg";
      
      games.push({
          id,
          slug,
          name,
          platform,
          genre,
          releaseDate,
          numOfPlayers,
          publisher,
          boxArt,
      });

      await supertest(api)
        .get("/games")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body.games)).toBeTruthy();
          expect(response.body.total).toEqual(1);
          expect(response.body.games[0].slug).toBe(slug);
          expect(response.body.games[0].name).toBe(name);
          expect(response.body.games[0].platform).toBe(platform);
          expect(response.body.games[0].genre).toBe(genre);
          expect(response.body.games[0].releaseDate).toBe(releaseDate.toISOString());
          expect(response.body.games[0].numOfPlayers).toBe(numOfPlayers);
          expect(response.body.games[0].publisher).toBe(publisher);
          expect(response.body.games[0].boxArt).toBe(boxArt);
        });
    });

    it("should return an empty array of games", async () => {
      await supertest(api)
        .get("/games")
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body.games)).toBeTruthy();
          expect(response.body.total).toEqual(0);
        });
    }); 
  });

  describe("POST /games", () => {
    it("should create a new game object", async () => {
      const name = "Final Fantasy VII";
      const platform = PSPlatform.PS1;
      const genre = "RPG";
      const releaseDate = new Date("1997-01-31");
      const numOfPlayers = 1;
      const publisher = "Square Enix";
      const boxArt = "https://www.gamesdatabase.org/Media/SYSTEM/Sony_Playstation/Box/big/Final_Fantasy_VII_-_1997_-_Sony_Computer_Entertainment.jpg";

      const data = {
        name,
        platform,
        genre,
        releaseDate,
        numOfPlayers,
        publisher,
        boxArt,
      };

      await supertest(api)
        .post("/games")
        .send(data)
        .expect(201)
        .then((response) => {
          // Check the response
          expect(response.body.slug).toBeTruthy();
          expect(response.body.name).toBe(name);
          expect(response.body.platform).toBe(platform);
          expect(response.body.genre).toBe(genre);
          expect(response.body.releaseDate).toBe(releaseDate.toISOString());
          expect(response.body.numOfPlayers).toBe(numOfPlayers);
          expect(response.body.publisher).toBe(publisher);
          expect(response.body.boxArt).toBe(boxArt);

          // Check the data in the array
          const game = games.find(game => game.slug === response.body.slug);
          expect(game).toBeTruthy();
          expect(game.name).toBe(name);
          expect(game.platform).toBe(platform);
          expect(game.genre).toBe(genre);
          expect(game.releaseDate).toEqual(releaseDate);
          expect(game.numOfPlayers).toBe(numOfPlayers);
          expect(game.publisher).toBe(publisher);
          expect(game.boxArt).toBe(boxArt);
        });
    })

    it("should create a new game object without box art", async () => {
      const name = "Final Fantasy VII";
      const platform = PSPlatform.PS1;
      const genre = "RPG";
      const releaseDate = new Date("1997-01-31");
      const numOfPlayers = 1;
      const publisher = "Square Enix";

      const data = {
        name,
        platform,
        genre,
        releaseDate,
        numOfPlayers,
        publisher,
      };

      await supertest(api)
        .post("/games")
        .send(data)
        .expect(201)
        .then((response) => {
          // Check the response
          expect(response.body.slug).toBeTruthy();
          expect(response.body.name).toBe(name);
          expect(response.body.platform).toBe(platform);
          expect(response.body.genre).toBe(genre);
          expect(response.body.releaseDate).toBe(releaseDate.toISOString());
          expect(response.body.numOfPlayers).toBe(numOfPlayers);
          expect(response.body.publisher).toBe(publisher);
          expect(response.body.boxArt).toBe(undefined);

          // Check the data in the array
          const game = games.find(game => game.slug === response.body.slug);
          expect(game).toBeTruthy();
          expect(game.name).toBe(name);
          expect(game.platform).toBe(platform);
          expect(game.genre).toBe(genre);
          expect(game.releaseDate).toEqual(releaseDate);
          expect(game.numOfPlayers).toBe(numOfPlayers);
          expect(game.publisher).toBe(publisher);
          expect(game.boxArt).toBe(undefined);
        });
    })

    it("should not create a new game object due to invalid field value", async () => {
      const name = "Final Fantasy VII";
      const platform = PSPlatform.PS1;
      const genre = "RPG";
      const releaseDate = new Date("1997-01-31");
      const numOfPlayers = "abc";
      const publisher = "Square Enix";
      const boxArt = "https://www.gamesdatabase.org/Media/SYSTEM/Sony_Playstation/Box/big/Final_Fantasy_VII_-_1997_-_Sony_Computer_Entertainment.jpg";

      const data = {
        name,
        platform,
        genre,
        releaseDate,
        numOfPlayers,
        publisher,
        boxArt,
      };

      await supertest(api)
        .post("/games")
        .send(data)
        .expect(500);
    })

    it("should not create a new game object due to missing field", async () => {
      const name = "Final Fantasy VII";
      const platform = PSPlatform.PS1;
      const genre = "RPG";
      const releaseDate = new Date("1997-01-31");
      const numOfPlayers = "abc";
      const boxArt = "https://www.gamesdatabase.org/Media/SYSTEM/Sony_Playstation/Box/big/Final_Fantasy_VII_-_1997_-_Sony_Computer_Entertainment.jpg";

      const data = {
        name,
        platform,
        genre,
        releaseDate,
        numOfPlayers,
        boxArt,
      };

      await supertest(api)
        .post("/games")
        .send(data)
        .expect(500);
    })
  });

  describe("PATCH /games/:slug", () => {
    it("should edit game data", async () => {
      const id = "cdef5487-6170-4ac0-a002-0c0e8a5c91f5";
      const slug = "ps1-final-fantasy-vii";
      const name = "Final Fantasy VII";
      const platform = PSPlatform.PS1;
      const genre = "RPG";
      const releaseDate = new Date("1997-01-31");
      const numOfPlayers = 1;
      const publisher = "Square Enix";
      const boxArt = "https://www.gamesdatabase.org/Media/SYSTEM/Sony_Playstation/Box/big/Final_Fantasy_VII_-_1997_-_Sony_Computer_Entertainment.jpg";
      
      games.push({
          id,
          slug,
          name,
          platform,
          genre,
          releaseDate,
          numOfPlayers,
          publisher,
          boxArt,
      });

      const data = {
        name: "Stranger of Paradise: Final Fantasy Origins",
        platform: PSPlatform.PS5,
        genre: "Action RPG",
        releaseDate: new Date("2022-03-10"),
        numOfPlayers: 2,
        publisher: "Square Enix / Team Ninja",
        boxArt: "https://www.gamesdatabase.org/Media/SYSTEM/Sony_Playstation/Box/big/FFO.jpg",
      };

      await supertest(api)
        .patch(`/games/${slug}`)
        .send(data)
        .expect(200)
        .then((response) => {
          // Check the response
          expect(response.body.slug).toBeTruthy();
          expect(response.body.name).toBe("Stranger of Paradise: Final Fantasy Origins");
          expect(response.body.platform).toBe(PSPlatform.PS5);
          expect(response.body.genre).toBe("Action RPG");
          expect(response.body.releaseDate).toBe(new Date("2022-03-10").toISOString());
          expect(response.body.numOfPlayers).toBe(2);
          expect(response.body.publisher).toBe("Square Enix / Team Ninja");
          expect(response.body.boxArt).toBe("https://www.gamesdatabase.org/Media/SYSTEM/Sony_Playstation/Box/big/FFO.jpg");
        });
    });
  });

  describe("DELETE /games/:slug", () => {
    it("should delete a given game", async () => {
      const id = "cdef5487-6170-4ac0-a002-0c0e8a5c91f5";
      const slug = "ps1-final-fantasy-vii";
      const name = "Final Fantasy VII";
      const platform = PSPlatform.PS1;
      const genre = "RPG";
      const releaseDate = new Date("1997-01-31");
      const numOfPlayers = 1;
      const publisher = "Square Enix";
      const boxArt = "https://www.gamesdatabase.org/Media/SYSTEM/Sony_Playstation/Box/big/Final_Fantasy_VII_-_1997_-_Sony_Computer_Entertainment.jpg";
      
      games.push({
          id,
          slug,
          name,
          platform,
          genre,
          releaseDate,
          numOfPlayers,
          publisher,
          boxArt,
      });

      await supertest(api)
        .delete(`/games/${slug}`)
        .expect(204)
        .then(() => {
          expect(games.length).toBe(0);
        });
    });
  });
});