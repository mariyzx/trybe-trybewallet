import React from "react";
import userEvent from "@testing-library/user-event";
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App'; 

describe('Teste do componente Login', () => {
  it('A rota inicia como "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  it('Os inputs de email, senha e o botão estão na tela', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('email-input');
    const senhaInput = screen.getByTestId('password-input');
    const buttonEntrar = screen.getByRole('button', { name: /Entrar/i });

    expect(emailInput).toBeInTheDocument();
    expect(senhaInput).toBeInTheDocument();
    expect(buttonEntrar).toBeInTheDocument();
  });

  it('Ao digitar email e uma senha com 6 digitos o botão é habilitado', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('email-input');
    const senhaInput = screen.getByTestId('password-input');
    const buttonEntrar = screen.getByRole('button', { name: /Entrar/i });

    userEvent.type(emailInput, 'teste@email.com');
    userEvent.type(senhaInput, '123456');

    expect(buttonEntrar).toBeEnabled();
  });

  it('O email fica salvo na store quando clicamos no botão', () => {
    const { store } = renderWithRouterAndRedux(<App />);
    const email = 'teste@email.com';

    const emailInput = screen.getByTestId('email-input');
    const senhaInput = screen.getByTestId('password-input');
    const buttonEntrar = screen.getByRole('button', { name: /Entrar/i });

    userEvent.type(emailInput, email);
    userEvent.type(senhaInput, '123456');
    expect(buttonEntrar).toBeEnabled();
    userEvent.click(buttonEntrar);

    expect(store.getState().user.email).toBe(email);
  })
})