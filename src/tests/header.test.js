import React from "react";
import userEvent from "@testing-library/user-event";
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from "../pages/Wallet";
import Header from "../components/Header";
import mockData from "./helpers/mockData"; 

export const INITIAL_STATE = {
  user: {
    email: 'teste@teste.com'
  },
  wallet: {
    currencies: [
      'USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE'
    ],
    expenses: [
      {
        id: 0,
        value: '1',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Trabalho',
        description: 'teste',
        exchangeRates: mockData,
      },
      {
        id: 1,
        value: '2',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Trabalho',
        description: 'teste 2',
        exchangeRates: mockData,
      }
    ]
  }
}

describe('Teste do componente header', () => {
  it('Quando fazemos o login o email aparece o header', () => {
    renderWithRouterAndRedux(<Header />, { initialState: INITIAL_STATE });

    const emailField = screen.getByTestId('email-field');
    expect(emailField).toContainHTML('teste@teste.com');
  })

  it('O valor da moeda no header é BRL', () => {
    renderWithRouterAndRedux(<Header />);

    const currency = screen.getByTestId('header-currency-field');
    expect(currency).toContainHTML('BRL')
  });

  it('O valor do total aparece na tela inicialmente como 0.00', () => {
    renderWithRouterAndRedux(<Header />);

    const totalField = screen.getByTestId('total-field');
    expect(totalField).toContainHTML('0.00');
  });

  it('Ao adicionar mais de um elemento, a soma entre eles aparece no header', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState: INITIAL_STATE });

    const value = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const currency = screen.getByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const category = screen.getByTestId('tag-input');
    const button = screen.getByRole('button', { name: 'Adicionar despesa' });

    userEvent.type(value, '1');
    userEvent.type(description, 'teste');
    userEvent.selectOptions(currency, 'USD');
    userEvent.selectOptions(method, 'Dinheiro');
    userEvent.selectOptions(category, 'Alimentação');
    userEvent.click(button);
    
    const totalField = screen.getByTestId('total-field');
    expect(totalField).toContainHTML('14.26');
  })
});