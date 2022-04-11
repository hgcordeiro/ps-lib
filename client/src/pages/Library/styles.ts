import { shade,  } from "polished";
import styled from "styled-components";

export const Container = styled.div``;

export const Header = styled.header`
  padding: 15px 0;
  background: #fff;
`;

export const Title = styled.h1`
  font-weight: bold;
  font-size: 28px;
`;

export const HeaderContent = styled.div`
  margin: 0 15px 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;

  img.ps-logo {
    height: 45px;
  }

  img.sony-logo {
    height: 15px;
  }

  .title-container {
    width: 1000px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: stretch;
    padding: 0
    margin: 0
  }

  .add-game-button {
    margin: 0 0 0 auto;
    
    font-weight: 600;
    border-radius: 8px;
    border: 0;
    background: #000;
    color: #fff;

    display: flex;

    transition: 0.2s;

    .text {
      padding: 16px 16px;
    }

    .icon {
      display: flex;
      padding: 16px 16px;
      border-radius: 0 8px 8px 0;
      margin: 0 auto;
    }

    &:hover {
      background: ${shade(0.8, '#fff')};
    }
  }
`;

export const Content = styled.main`
  height: 100 vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 0 0 0;
`;

export const GameList = styled.div`
  border-radius: 4px;
  max-width: 1000px;
  padding: 0;
`;
