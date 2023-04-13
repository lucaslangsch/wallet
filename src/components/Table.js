import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Table extends Component {
  // state = {
  //   id: 0,
  //   value: 0,
  //   description: '',
  //   method: '',
  //   currency: '',
  //   tag: '',
  //   exchangeRate: 0,
  //   coin_brl: 'BRL',
  //   valueBrl: 0,
  // };

  // componentDidUpdate(prevProps) {
  //   const { expenses } = this.props;
  //   if (expenses[expenses.length - 1] !== prevProps[expenses.length - 1]) {
  //   console.log("entrou");
  //   }
  // }

  render() {
    const { expenses } = this.props;

    return (
      <table>
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
        <tbody>
          {
            expenses && expenses.map(({
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
                </tr>
              );
            })
          }
        </tbody>
      </table>
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
};

export default connect(mapStateToProps)(Table);
