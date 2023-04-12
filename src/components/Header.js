import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Header extends Component {
  state = {
    valueSum: 0,
    value: 0,
  };

  componentDidUpdate(prevProps) {
    const { expenses } = this.props;
    if (expenses.length !== prevProps.expenses.length) {
      const convertValue = (
        expenses[expenses.length - 1]
          .exchangeRates[expenses[expenses.length - 1].currency]).ask;
      this.setState({
        value: parseFloat(expenses[expenses.length - 1].value) * parseFloat(convertValue),
      }, () => {
        this.setState((state) => (
          { valueSum: parseFloat(state.valueSum) + parseFloat(state.value) }
        ));
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
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(Header);
