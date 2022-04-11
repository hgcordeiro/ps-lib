import React, { useRef, useCallback, useState } from 'react';

import Select from 'react-select'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import { customStyles, Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import IGame from '../../types/IGame';
import { PSPlatform } from '../../types/PSPlatform';
import { genreOptions } from '../../types/genreOptions';
import { platformOptions } from '../../types/platformOptions';

interface ICreateGameData {
  name: string;
  platform: PSPlatform;
  genre: string;
  releaseDate: Date;
  numOfPlayers: number;
  publisher: string;
  boxArt?: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddGame: (game: Omit<IGame, 'id' | 'slug'>) => void;
}

const ModalAddGame: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddGame,
}) => {
  const formRef = useRef<FormHandles>(null);
  const [selectedPlatformOption, setSelectedPlatformOption] = useState<PSPlatform>();
  const [selectedGenreOption, setSelectedGenreOption] = useState();
  const [startDate, setStartDate] = useState<Date | undefined>();

  const handleSubmit = useCallback(
    async (data: ICreateGameData) => {

      let gameData = data

      if (selectedPlatformOption) {
        gameData = { ...gameData, platform: selectedPlatformOption };
      } 
      
      if (selectedGenreOption) {
        gameData = { ...gameData, genre: selectedGenreOption };
      } 

      if (startDate) {
        gameData = { ...gameData, releaseDate: startDate };
      } 

      handleAddGame(gameData);
      setIsOpen();
      if (!isOpen) {
        setStartDate(undefined);
      }
    },[handleAddGame, isOpen, selectedGenreOption, selectedPlatformOption, setIsOpen, startDate],
  );

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
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Add Game Info</h1>
        <Input name="boxArt" placeholder="Box art URL" />
        <Input name="name" placeholder="Game Name" />
        <Select 
          className="select" 
          name="platform" 
          options={platformOptions} 
          styles={customStyles} 
          placeholder="Select a platform"
          onChange={handlePlatformChange}
        />
        <Select 
          className="select" 
          name="genre" 
          options={genreOptions} 
          styles={customStyles} 
          placeholder="Select a genre"
          onChange={handleGenreChange}
        />
        <DatePicker 
          id="release-date"
          maxDate={new Date()}
          dateFormat="dd/MM/yyyy"
          placeholderText="Release date" 
          selected={startDate} 
          onChange={(date:Date) => setStartDate(date)} 
        />
        <Input name="numOfPlayers" placeholder="Number of players" />
        <Input name="publisher" placeholder="Publisher" />

        <button className="form-button" type="submit" data-testid="add-game-button" >
          <p className="text">Add</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddGame;
