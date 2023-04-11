import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { addUser } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isButtonDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { email, password } = this.state;
      const minLenghtPassword = 6;
      const emailValidation = email.includes('.com') && email.includes('@');
      if (password.length >= minLenghtPassword && emailValidation) {
        this.setState({
          isButtonDisabled: false,
        });
      } else {
        this.setState({
          isButtonDisabled: true,
        });
      }
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(addUser(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, isButtonDisabled } = this.state;
    return (
      <form>
        <label>
          Email:
          <input
            type="email"
            data-testid="email-input"
            placeholder="Digite aqui seu email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label>
          Senha:
          <input
            type="password"
            data-testid="password-input"
            placeholder="Digite aqui sua senha"
            name="password"
            value={ password }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="submit"
          disabled={ isButtonDisabled }
          onClick={ (event) => this.handleSubmit(event) }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
