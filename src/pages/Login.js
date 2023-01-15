import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { saveEmail as saveEmailAction } from '../redux/actions';
import Footer from '../components/Footer';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      senha: '',
      disabled: true,
      redirect: false,
    };
  }

  buttonDisabled = () => {
    const { email, senha } = this.state;
    const min = 6;
    if (email.includes('.com') && senha.length >= min) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.buttonDisabled);
  }

  handleButton = () => {
    const { emailSaved } = this.props;
    const { email } = this.state;
    emailSaved(email);
    this.setState({ redirect: true });
  }

  render() {
    const { disabled, redirect } = this.state;
    return (
      <div>
        <h1>Trybewallet!</h1>
        <form>
          <div>
            <label htmlFor="email">
              <input
                type="email"
                name="email"
                data-testid="email-input"
                onChange={ (e) => this.handleChange(e) }
                placeholder="* Email"
              />
            </label>
          </div>
          <div>
            <label htmlFor="senha">
              <input
                name="senha"
                type="password"
                data-testid="password-input"
                onChange={ (e) => this.handleChange(e) }
                placeholder="* Senha (6 dígitos)"
              />
            </label>
          </div>
          <button
            type="button"
            onClick={ this.handleButton }
            disabled={ disabled }
          >
            Entrar
          </button>
        </form>
        { redirect && <Redirect to="/carteira" /> }
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  emailSaved: (email) => dispatch(saveEmailAction(email)),
});

Login.propTypes = {
  emailSaved: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
