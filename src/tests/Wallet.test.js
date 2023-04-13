import { screen } from '@testing-library/react';
import React from 'react';
// import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testa se a página /carteira/ renderiza:', () => {
  it('com o email digitado anteriormente ', () => {
    const initialState = {
      user: {
        email: 'teste@teste.com',
      },
      wallet: {
        currencies: [],
        expenses: [],
        editor: false,
        idToEdit: 0,
      },
    };
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    const headerElement = screen.getByRole('heading', { name: /olá, teste@teste\.com/i });
    expect(headerElement).toBeInTheDocument();
  });

  it('com o campo de valor total de despesas ', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const valueElement = screen.getByTestId('total-field');
    expect(valueElement).toBeInTheDocument();
  });

  it('com o input do tipo number para o valor da despesa', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const inputValueElement = screen.getByRole('spinbutton', { name: /valor:/i });
    expect(inputValueElement).toBeInTheDocument();
  });
});
