import React, { useRef, useCallback, useState } from 'react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { customStyles, Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import IGame from '../../types/IGame';
import { PSPlatform } from '../../types/PSPlatform';
import { platformOptions } from '../../types/platformOptions';
import { genreOptions } from '../../types/genreOptions';

import Select from '../Select';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateGame: (game: Omit<IGame, 'id'>) => void;
  editingGame: IGame;
  releaseDate: Date;
}

interface IEditGameData {
  slug: string;
  name: string;
  platform: PSPlatform;
  genre: string;
  releaseDate: Date;
  numOfPlayers: number;
  publisher: string;
  boxArt?: string;
}

const ModalEditGame: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  editingGame,
  handleUpdateGame,
}) => {
  const formRef = useRef<FormHandles>(null);
  const [selectedPlatformOption, setSelectedPlatformOption] = useState<PSPlatform>(editingGame.platform);
  const [selectedGenreOption, setSelectedGenreOption] = useState(editingGame.genre);

  const [selectedDate, setSelectedDate] = useState<Date>(editingGame.releaseDate ? new Date(editingGame.releaseDate) : new Date());
  console.log("🚀 ~ file: index.tsx ~ line 56 ~ selectedDate", selectedDate)

  const handleSubmit = useCallback(
    async (data: IEditGameData) => {
      let gameData = data

      if (selectedPlatformOption) {
        gameData = { ...gameData, platform: selectedPlatformOption };
      } 
      
      if (selectedGenreOption) {
        gameData = { ...gameData, genre: selectedGenreOption };
      } 

      if (selectedDate) {
        gameData = { ...gameData, releaseDate: selectedDate };
        
      } 

      console.log("🚀 ~ file: index.tsx ~ line 63 ~ gameData", gameData)

      handleUpdateGame(gameData);

      setIsOpen();
    },
    [handleUpdateGame, selectedDate, selectedGenreOption, selectedPlatformOption, setIsOpen],
  );

  const handleDateChange = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  const handlePlatformChange = useCallback(
    async (option) => {
    setSelectedPlatformOption(option.value);

    },[],
  );

  const handleGenreChange = useCallback(
    async (option) => {
    setSelectedGenreOption(option.value);

    },[]
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingGame}>
        <h1>Edit Game Info</h1>
        <Input name="boxArt" placeholder="Box art URL"/>
        <Input name="name" placeholder="Name" />
        <Select 
          className="select" 
          name="platform" 
          options={platformOptions} 
          styles={customStyles} 
          placeholder="Select a platform"
          value={platformOptions ? platformOptions.find(option => option.value === selectedPlatformOption) : ''}
          onChange={handlePlatformChange}
        />
        <Select 
          className="select" 
          name="genre" 
          options={genreOptions} 
          styles={customStyles} 
          placeholder="Select a genre"
          onChange={handleGenreChange}
          value={genreOptions ? genreOptions.find(option => option.value === selectedGenreOption) : ''}
        />
        {<DatePicker 
          id="release-date"
          selected={selectedDate}
          dateFormat="dd/MM/yyyy"
          placeholderText="Release date" 
          onChange={handleDateChange}
        />}
        <Input name="numOfPlayers" placeholder="Number of players" />
        <Input name="publisher" placeholder="Publisher" />

        <button className="form-button" type="submit" data-testid="edit-game-button">
          <div className="text">Edit</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditGame;
