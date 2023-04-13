import { screen, fireEvent } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const EMAIL_VALID = 'email@email.com';

describe('Testa se a página inicial renderiza', () => {
  it('os inputs de login e senha e um botão', () => {
    renderWithRouterAndRedux(<App />);
    const inputLoginElement = screen.getByRole('textbox', { name: /email:/i });
    expect(inputLoginElement).toBeInTheDocument();
    const inputPasswordElement = screen.getByLabelText(/senha:/i);
    expect(inputPasswordElement).toBeInTheDocument();
    const buttonElement = screen.getByRole('button', { name: /entrar/i });
    expect(buttonElement).toBeInTheDocument();
  });
});

describe('Testa se o formulário de login:', () => {
  it('tem o botão desabilitado inicialmente', () => {
    renderWithRouterAndRedux(<App />);
    const buttonElement = screen.getByRole('button', { name: /entrar/i });
    expect(buttonElement).toBeDisabled();
  });

  it('tem o botão habilitado após validação do formulário', () => {
    renderWithRouterAndRedux(<App />);
    const buttonElement = screen.getByRole('button', { name: /entrar/i });
    const inputLoginElement = screen.getByRole('textbox', { name: /email:/i });
    const inputPasswordElement = screen.getByLabelText(/senha:/i);

    userEvent.type(inputLoginElement, 'email');
    userEvent.type(inputPasswordElement, '123456');
    expect(buttonElement).toBeDisabled();
    userEvent.clear(inputLoginElement);
    userEvent.clear(inputPasswordElement);

    userEvent.type(inputLoginElement, EMAIL_VALID);
    userEvent.type(inputPasswordElement, '12345');
    expect(buttonElement).toBeDisabled();
    userEvent.clear(inputLoginElement);
    userEvent.clear(inputPasswordElement);

    userEvent.type(inputLoginElement, EMAIL_VALID);
    userEvent.type(inputPasswordElement, '123456');
    expect(buttonElement).not.toBeDisabled();
  });

  describe('Testa se a página inicial após validação  dos formulários e clique', () => {
    it('tem o email salvo no global state com a chave /email/', () => {
      const { store } = renderWithRouterAndRedux(<App />, '/');
      const buttonElement = screen.getByRole('button', { name: /entrar/i });
      const inputLoginElement = screen.getByRole('textbox', { name: /email:/i });
      const inputPasswordElement = screen.getByLabelText(/senha:/i);

      userEvent.type(inputLoginElement, EMAIL_VALID);
      userEvent.type(inputPasswordElement, '123456');
      fireEvent.click(buttonElement);

      expect(store.getState().user.email).toBe(EMAIL_VALID);
    });

    it('muda para a rota /carteira/', () => {
      const { history } = renderWithRouterAndRedux(<App />, '/');
      const buttonElement = screen.getByRole('button', { name: /entrar/i });
      const inputLoginElement = screen.getByRole('textbox', { name: /email:/i });
      const inputPasswordElement = screen.getByLabelText(/senha:/i);

      userEvent.type(inputLoginElement, EMAIL_VALID);
      userEvent.type(inputPasswordElement, '123456');
      fireEvent.click(buttonElement);

      expect(history.location.pathname).toBe('/carteira');
    });
  });
});
