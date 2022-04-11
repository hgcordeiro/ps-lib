import { format } from "date-fns";

import { FiEdit, FiTrash2 } from "react-icons/fi"

import IGame from "../../types/IGame";

import defaultBoxCover from "../../assets/psdefault.png";

import "./style.css";

interface IProps {
  game: IGame;
  handleDelete: (slug: string) => {};
  handleEditGame: (food: IGame) => void;
}

const GameItem: React.FC<IProps> = ({ game, handleDelete, handleEditGame }) => {
  const { 
    name, 
    platform, 
    genre, 
    releaseDate, 
    numOfPlayers, 
    publisher, 
    boxArt,
  } = game;
  
  const formattedDate = format(new Date(releaseDate), "dd/MM/yyyy");

  const boxArtImg = boxArt 
    ? boxArt
    : defaultBoxCover;

  return (
    <div className="game-item">
      <div className="box-art-container">
      <img src={boxArtImg} alt="game box art" />
      </div>
      <div className="game-info">
        <div className="header-info">
          <div className="game-title">
            {name}
          </div>
          <div className="platform">
            <span>{platform}</span>
          </div>
        </div>
        <div className="content-info">
          <div>Release date: {formattedDate}</div>
          <div>Publisher: {publisher}</div>
          <div>Genre: {genre}</div>
          <div>Number of players: {numOfPlayers}</div>
        </div>
        
      </div>
      <div className="icons">
        <button className="button" onClick={() => handleEditGame(game)}><FiEdit /></button>
        <button className="button" onClick={() => handleDelete(game.slug)}><FiTrash2 /></button>
      </div>
      
    </div>
  );
};

export default GameItem;
