import React from "react";
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from "../pages/Wallet";
import mockData from "./helpers/mockData";
import { INITIAL_STATE } from "./header.test";

describe('Testando a API de moedas', () => {
  it('Renderizando o componente Wallet', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<Wallet />, { initialState: INITIAL_STATE });
  });
});
 