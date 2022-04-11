
import { useEffect, useState } from "react";

import api from '../../services/api'; 

import psLogo from "../../assets/ps-logo.png";
import sonyLogo from "../../assets/sony-logo.svg";

import GameItem from "../../components/GameItem";

import { FiPlus } from "react-icons/fi";

import { 
  Container,
  Content,
  GameList,
  Header,
  HeaderContent,
  Title, 
} from "./styles";
import ModalAddGame from "../../components/ModalAddGame";
import ModalEditGame from "../../components/ModalEditGame";
import IGame from "../../types/IGame";
import Pagination from "../../components/Pagination";

const Library: React.FC = () => {
  const [games, setGames] = useState<IGame[]>([]);
  const [editingGame, setEditingGame] = useState<IGame>({} as IGame);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount]  = useState(0);

  const limit = 3;

  useEffect(() =>{
    async function loadGames(): Promise<void> {
      const response = await api.get(`/games?page=${currentPage}&limit=${limit}`);

      setGames(response.data.games);
      setTotalCount(response.data.total);
    }

    loadGames();
  }, [currentPage, games]);

  async function handleAddGame(
    game: Omit<IGame, 'id' | 'slug'>,
  ): Promise<void> {
    try {
      const response = await api.post('/games', { ...game });
      const newGame = response.data;

      setGames([...games, newGame]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateGame(
    game: Omit<IGame, 'id'>,
  ): Promise<void> {
    const response = await api.patch(`/games/${editingGame.slug}`, {
      ...editingGame,
      ...game,
    });

    const updatedGame: IGame = response.data;

    const updatedGames = games.map(gamesElement => {
      if (gamesElement.slug === updatedGame.slug) {
        return updatedGame;
      }

      return gamesElement;
    });

    setGames(updatedGames);
  }

  async function handleDeleteGame(slug: string): Promise<void> {
    await api.delete(`/games/${slug}`);

    const newGames = games.filter(game => game.slug !== slug);

    setGames(newGames);
  }

  function toggleAddModal(): void {
    setAddModalOpen(!addModalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditGame(game: IGame): void {
    setEditingGame(game);
    toggleEditModal();
  }

  return (
    <Container>
      <Header>
        <HeaderContent>
          <div className="ps-logo-container">
            <img className="ps-logo" src={psLogo} alt={"Playstation Logo"} />
          </div>
          <div className="title-container">
            <Title>Playstation Game Library</Title>
            <button className="add-game-button" onClick={() => toggleAddModal()}>
              <div className="text">Add Game</div>
              <div className="icon">
                <FiPlus size={24} />
              </div>
            </button>
          </div>
          <div className="sony-logo-container">
            <img className="sony-logo" src={sonyLogo} alt={"Sony Logo"} />
          </div>
        </HeaderContent>
      </Header>
      <Content>
      { addModalOpen &&
        <ModalAddGame
          isOpen={addModalOpen}
          setIsOpen={toggleAddModal}
          handleAddGame={handleAddGame}
        />
      }
      { editModalOpen &&
        <ModalEditGame
          isOpen={editModalOpen}
          setIsOpen={toggleEditModal}
          editingGame={editingGame}
          handleUpdateGame={handleUpdateGame}
          releaseDate={editingGame.releaseDate}
        />
      }
      <GameList data-testid="game-list">
        { games &&
          games.map(game => (
            <GameItem
              key={game.slug}
              game={game}
              handleDelete={handleDeleteGame}
              handleEditGame={handleEditGame}
            />
          ))
        }
        <Pagination
          className="pagination"
          currentPage={currentPage}
          onPageChange={(page: number) => setCurrentPage(page)}
          totalCount={totalCount}
          pageSize={limit} 
          siblingCount={2}  
        />
      </GameList>
      </Content>
    </Container>
  );
};

export default Library;
