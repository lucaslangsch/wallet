import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getCurrenciesListThunk, getExchageList } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    isButtonDisabled: false,
    method: 'Dinheiro',
    currency: '',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrenciesListThunk());
  }

  componentDidUpdate() {
    const { currencies } = this.props;
    const { currency } = this.state;
    if (currency === '') {
      this.setState({
        currency: currencies[0],
      });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    const { id, value, description, currency, method, tag } = this.state;

    dispatch(getExchageList({ id, value, description, currency, method, tag }));
    this.setState({
      id: id + 1,
      value: '',
      description: '',
    });
  };

  render() {
    const { value, description, isButtonDisabled, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <label>
          Valor:
          <input
            type="number"
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label>
          Moeda:
          <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies.map((currencie) => (
              <option
                key={ currencie }
                value={ currencie }
              >
                {currencie}
              </option>))}
          </select>
        </label>
        <label>
          Descrição:
          <input
            type="text"
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label>
          Método de pagamento:
          <select
            name="method"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label>
          Categoria:
          <select
            name="tag"
            data-testid="tag-input"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="submit"
          disabled={ isButtonDisabled }
          onClick={ (event) => this.handleSubmit(event) }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.wallet,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
