import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const total = expenses.map((account) => {
      const cotaçao = Number(account.exchangeRates[account.currency].ask);
      const valorReal = cotaçao * Number(account.value);
      return Number(valorReal);
    });
    const valorTotal = total.reduce((sum, i) => sum + i, 0);
    return (
      <div className="header-div">
        <span>
          <p>
            <span role="img" aria-labelledby="panda1">&#128176;</span>
            Trybewallet!
          </p>
        </span>
        <p data-testid="email-field">
          Email:
          {' '}
          { email }
        </p>
        <div className="total-currency">
          <p data-testid="total-field">
            { valorTotal.toFixed(2) }
          </p>
          <p data-testid="header-currency-field">
            BRL
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
