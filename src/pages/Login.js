import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { addUser } from '../redux/actions';
import backgroundImg from '../assets/bg.png';

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
      <div
        className="h-screen flex justify-center items-center"
        style={ { backgroundImage: `url(${backgroundImg})`, backgroundSize: '10% auto' } }
      >
        <form
          className="w-2/5 h-3/6 rounded-2xl backdrop-blur
        gap-y-36 flex flex-col justify-center items-center"
        >
          <div className="flex flex-col w-2/4">

            <label htmlFor="email">
              Email:
            </label>
            <input
              id="email"
              type="email"
              data-testid="email-input"
              placeholder="Digite aqui seu email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              className="rounded-md border-0 focus:ring-2
              focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex flex-col w-2/4">

            <label htmlFor="senha">
              Senha:
            </label>
            <input
              id="senha"
              type="password"
              data-testid="password-input"
              placeholder="Digite aqui sua senha"
              name="password"
              value={ password }
              onChange={ this.handleChange }
            />
          </div>
          <button
            type="submit"
            disabled={ isButtonDisabled }
            onClick={ (event) => this.handleSubmit(event) }
            className={ `py-2 px-4 bg-gray-400 rounded-md font-medium text-white w-2/4
            ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : (
        'bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-green-600')}` }
            ref={ (button) => {
              if (button) {
                button.classList.toggle('bg-green-500', !isButtonDisabled);
              }
            } }
          >
            Entrar
          </button>
        </form>
      </div>
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
