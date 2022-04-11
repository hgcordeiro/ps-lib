import express from "express";

import * as gameController from "../controllers/gameController";
import { celebrate, Segments, Joi } from "celebrate";

const router = express.Router();

router.get("/games", gameController.index);
router.post(
  "/games",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      platform: Joi.string().required(),
      genre: Joi.string().required(),
      releaseDate: Joi.date().required(),
      numOfPlayers: Joi.number().required(),
      publisher: Joi.string().required(),
      boxArt: Joi.string().allow(null).allow('').optional(),
    }
  }),
  gameController.create
);
router.patch(
  "/games/:slug",
  celebrate({
    [Segments.BODY]: {
      slug: Joi.string(),
      name: Joi.string().allow('').optional(),
      platform: Joi.string().allow('').optional(),
      genre: Joi.string().allow('').optional(),
      releaseDate: Joi.date().allow('').optional(),
      numOfPlayers: Joi.number().allow('').optional(),
      publisher: Joi.string().allow('').optional(),
      boxArt: Joi.string().allow(null).allow('').optional(),
    }
  }),
  gameController.edit
);
router.get("/games/:slug", gameController.detail);
router.delete("/games/:slug", gameController.delete);

export default router;