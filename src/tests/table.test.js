import React from "react";
import userEvent from "@testing-library/user-event";
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { INITIAL_STATE } from "./header.test";
import Table from "../components/Table";
import mockData from "./helpers/mockData"; 

describe('Testa o componente Table', () => {
  it('Ao clicar no botão de excluir a informação é excluída da store', () => {
    const { store } = renderWithRouterAndRedux(<Table />, { initialState: INITIAL_STATE });

    const button = screen.getAllByTestId('delete-btn');
    userEvent.click(button[0]);

    const arr = [
      {
        id: 1,
        value: '2',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Trabalho',
        description: 'teste 2',
        exchangeRates: mockData,
      },
    ]

    expect(store.getState().wallet.expenses).toEqual(arr)
  });
  it('Ao clicar no botão de editar a informação é alterada na store', () => {
    renderWithRouterAndRedux(<Table />, { initialState: INITIAL_STATE });

    const button = screen.getAllByTestId('edit-btn');
    userEvent.click(button[0]);
  });
});