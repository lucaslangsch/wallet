import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faBrazilianRealSign } from '@fortawesome/free-solid-svg-icons';

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
      <header className="flex md:h-1/6 w-full justify-between bg-emerald-800 shadow-xl">
        <div className="w-full ml-8 flex flex-row items-center text-2xl gap-2">
          <h2><FontAwesomeIcon icon={ faWallet } size="2xl" /></h2>
          <h2 data-testid="email-field">
            {`Olá, ${email}`}
            <br />
            Bem vindo a sua TrybeWallet
          </h2>
        </div>
        <div
          className="w-full flex flex-row items-center
        text-2xl gap-2 justify-end mr-8"
        >

          <FontAwesomeIcon icon={ faBrazilianRealSign } size="sm" />
          <p data-testid="total-field">
            { valueSum.toFixed(2) }

          </p>
          <p data-testid="header-currency-field">BRL</p>

        </div>
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
