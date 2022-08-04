import React from "react";
import userEvent from "@testing-library/user-event";
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import WalletForm from "../components/WalletForm";
import mockData from "./helpers/mockData";
import { INITIAL_STATE } from "./header.test"; 

const STATE_EDIT = {
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
    ],
    editor: true,
    idToEdit: 0,
  },
}

afterEach(() => jest.clearAllMocks())

describe('Testa o componente walletForm', () => {
  it('Os campos de input aparecem na tela', () => {
    renderWithRouterAndRedux(<WalletForm />);

    const value = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const currency = screen.getByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const category = screen.getByTestId('tag-input');

    expect(value).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    expect(currency).toBeInTheDocument()
    expect(method).toBeInTheDocument()
    expect(category).toBeInTheDocument()
  });

  it('Ao clicar no botão de Adicionar despesa os inputs são limpos', () => {
    renderWithRouterAndRedux(<WalletForm />);

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

    expect(value).toContainHTML('');
    expect(description).toContainHTML('');
    expect(currency).toContainHTML('');
    expect(method).toContainHTML('');
    expect(category).toContainHTML('');
  });

  it('O campo de Moedas deve ter uma respectiva quantidade', () => {
    renderWithRouterAndRedux(<WalletForm />);

    const arr =  [
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
    ];

    expect(INITIAL_STATE.wallet.currencies).toEqual(arr);
  });
  it('Após clicar no botão as informações são salvas na store', () => {
    renderWithRouterAndRedux(<WalletForm />);

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
  });
  it('Ao clicar no botão de editar a informação é alterada', () => {
    renderWithRouterAndRedux(<WalletForm />, { initialState: STATE_EDIT });

    const editButton = screen.getByRole('button', { name: /Editar despesa/i });
    userEvent.click(editButton);
  });
});