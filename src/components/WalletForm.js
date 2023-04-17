import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getCurrenciesListThunk,
  getExchageList,
  getExchageRatesToEdit } from '../redux/actions';

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

  componentDidUpdate(prevProps) {
    const { currencies, editor, expenses, idToEdit } = this.props;
    const { currency } = this.state;
    if (currency === '') {
      this.setState({
        currency: currencies[0],
      });
    }
    if (editor !== prevProps.editor && editor) {
      const expenseToEdit = expenses.find((expense) => expense.id === idToEdit);
      this.setState({
        value: expenseToEdit.value,
        description: expenseToEdit.description,
        method: expenseToEdit.method,
        currency: expenseToEdit.currency,
        tag: expenseToEdit.tag,
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
    const { dispatch, idToEdit, editor } = this.props;
    const { id, value, description, currency, method, tag } = this.state;
    if (editor) {
      dispatch(
        getExchageRatesToEdit(
          { id: idToEdit, value, description, currency, method, tag },
        ),
      );
      this.setState({
        value: '',
        description: '',
      });
    } else {
      dispatch(getExchageList({ id, value, description, currency, method, tag }));
      this.setState({
        id: id + 1,
        value: '',
        description: '',
      });
    }
  };

  render() {
    const { value,
      description,
      isButtonDisabled,
      currency,
      method,
      tag,
    } = this.state;
    const { currencies, editor } = this.props;
    return (
      <form
        className="flex mt-6 md:h-16 md:w-fit px-8 gap-8
      justify-around items-center rounded-3xl ring-1 ring-gray-200 ml-24"
      >
        <label>
          Valor:&nbsp;&nbsp;&nbsp;
          <input
            type="number"
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ this.handleChange }
            placeholder="   $"
            className="rounded-md border-0 focus:ring-2
            focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
          />
        </label>
        <label>
          Moeda:&nbsp;&nbsp;&nbsp;
          <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
            className="rounded-md border-0 focus:ring-2
            focus:ring-inset focus:ring-green-600 sm:text-m sm:leading-6"
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
          Descrição:&nbsp;&nbsp;&nbsp;
          <input
            type="text"
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ this.handleChange }
            className="rounded-md border-0 focus:ring-2
            focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
          />
        </label>
        <label>
          Método de pagamento:&nbsp;&nbsp;&nbsp;
          <select
            name="method"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
            className="rounded-md border-0 focus:ring-2
            focus:ring-inset focus:ring-green-600 sm:text-m sm:leading-6"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label>
          Categoria:&nbsp;&nbsp;&nbsp;
          <select
            name="tag"
            data-testid="tag-input"
            value={ tag }
            onChange={ this.handleChange }
            className="rounded-md border-0 focus:ring-2 focus:ring-inset
            focus:ring-green-600 sm:text-m sm:leading-6"
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
          className="bg-gray-200 px-1 cursor-pointer
          rounded-full ring-1 ring-inset ring-gray-900/5"
        >
          {editor ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.wallet,
});

WalletForm.defaultProps = {
  idToEdit: null,
};

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    exchangeRates: PropTypes.arrayOf,
  })).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
