import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { removeExpense, editExpense } from '../redux/actions/index';

class Table extends Component {
  handleClick = (id) => {
    const { dispatch } = this.props;
    dispatch(removeExpense(id));
  };

  handleEditClick = (id) => {
    const { dispatch } = this.props;
    dispatch(editExpense(id));
  };

  render() {
    const { expenses } = this.props;
    const sortedExpenses = expenses.sort((a, b) => a.id - b.id);
    return (
      <div className="flex justify-center mt-6">
        <table className="w-5/6 justify-center text-center">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {expenses.length > 0 ? null
                : <td colSpan="9" className="text-center">Nenhuma despesa registrada</td>}
            </tr>
          </tbody>
          <tbody>
            {
              expenses && sortedExpenses.map(({
                id, value, description, method, currency, tag, exchangeRates,
              }) => {
                const currencyToExchange = exchangeRates[currency];
                const exchangeRate = parseFloat(currencyToExchange.ask).toFixed(2);
                const valueBrl = (value * currencyToExchange.ask).toFixed(2);
                const valueDecimal = parseFloat(value).toFixed(2);
                return (
                  <tr key={ id }>
                    <td>{description}</td>
                    <td>{tag}</td>
                    <td>{method}</td>
                    <td>{valueDecimal}</td>
                    <td>{currencyToExchange.name}</td>
                    <td>{exchangeRate}</td>
                    <td>{valueBrl}</td>
                    <td>Real</td>
                    <td>
                      <button
                        data-testid="edit-btn"
                        onClick={ () => this.handleEditClick(id) }
                        className="bg-gray-200 px-1 cursor-pointer
                        rounded-full ring-1 ring-inset ring-gray-900/5"
                      >
                        Editar
                      </button>
                      &nbsp;&nbsp;
                      <button
                        data-testid="delete-btn"
                        onClick={ () => this.handleClick(id) }
                        className="bg-gray-200 px-1 cursor-pointer
                        rounded-full ring-1 ring-inset ring-gray-900/5"
                      >
                        Deletar
                      </button>

                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.wallet,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
