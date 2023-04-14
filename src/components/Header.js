import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Header extends Component {
  state = {
    valueSum: 0,
  };

  componentDidUpdate(prevProps) {
    const { expenses } = this.props;
    if (expenses.length !== prevProps.expenses.length && expenses.length > 0) {
      const sum = expenses.reduce((acc, expense) => {
        const currencyToExchange = expense.exchangeRates[expense.currency];
        const valueBrl = (expense.value * currencyToExchange.ask);
        return acc + parseFloat(valueBrl);
      }, 0);
      this.setState({
        valueSum: sum,
      });
    } else if (expenses.length !== prevProps.expenses.length && expenses.length === 0) {
      this.setState({
        valueSum: 0,
      });
    }
  }

  render() {
    const { email } = this.props;
    const { valueSum } = this.state;
    return (
      <header>
        <h3 data-testid="email-field">
          {`Olá, ${email}`}
        </h3>
        <p data-testid="total-field">{ valueSum.toFixed(2) }</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.user,
  ...state.wallet,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    exchangeRates: PropTypes.shape({
      ask: PropTypes.string,
    }),
    value: PropTypes.string,
    currency: PropTypes.string,
  })).isRequired,
};

export default connect(mapStateToProps)(Header);
