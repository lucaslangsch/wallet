import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

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
});

describe.only('Testa se a página /carteira/ renderiza:', () => {
  it('com as opções de input e salva na store ', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(mockData),
    });

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
    const currenciesForStorage = [
      'USD',
      'CAD',
      'EUR',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE',
    ];

    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    const inputValueElement = screen.getByRole('spinbutton', { name: /valor:/i });
    const selectCurrencyElement = screen.getByRole('combobox', { name: /moeda:/i });
    const descriptionElement = screen.getByRole('textbox', { name: /descrição:/i });
    const selectMethodELement = screen.getByRole('combobox', { name: /método de pagamento:/i });
    const selectTagElement = screen.getByRole('combobox', { name: /categoria:/i });
    // const buttonAddElement = screen.getByRole('button', { name: /adicionar despesa/i });

    await waitFor(() => {
      userEvent.type(inputValueElement, '1');
      userEvent.selectOptions(selectCurrencyElement, 'USD');
      userEvent.type(descriptionElement, 'teste');
      userEvent.selectOptions(selectMethodELement, 'Dinheiro');
      userEvent.selectOptions(selectTagElement, 'Alimentação');
    });
    expect(store.getState().wallet.currencies).toStrictEqual(currenciesForStorage);
  });
});
