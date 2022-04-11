import styled from 'styled-components';
import { shade } from 'polished';
import { Form as Unform } from '@unform/web';

export const Form = styled(Unform)`
  padding: 48px 40px;
  display: flex;
  flex-direction: column;

  h1 {
    font-weight: 600;
    font-size: 36px;
    line-height: 36px;
    margin-bottom: 40px;
  }

  .form-button {
    margin-top: 48px;
    align-self: flex-end;
    font-weight: 600;
    border-radius: 8px;
    border: 0;
    background: #000;
    color: #fff;

    display: flex;
    flex-direction: row;
    align-items: center;

    transition: 0.2s;

    .text {
      padding: 16px 24px;
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

  .select {
    margin-bottom: 24px;
    border: none;
  }

  #release-date {
    width: 100%;
    margin-bottom: 24px;
    border: none;
    border-radius: 8px;
    padding: 18px 24px;
  }
`;

export const customStyles = {
  placeholder: () => ({
    color: "#b7b7cc",
  }),
  option: () => ({
    color: "#000",
    padding: "4px 0 16px 16px",
    border: "0",
  }),
  valueContainer: () => ({
    color: "#000",
    padding: "18px 0 16px 16px",
    border: "0",
    display: "flex",
    alignItens: "center",
    justifyContent: "center",
    borderRadius: "8px",
  }),
  control: (base: any) => ({
    ...base,
    border: 0,
    boxShadow: 'none'
  })
};
