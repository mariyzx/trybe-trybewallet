import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getCurrencyThunk, saveEdit, saveExpense } from '../redux/actions';
import currencyAPI from '../services/currencyAPI';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { getCurrency } = this.props;
    getCurrency();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  allCurrencyAPI = async () => {
    // pegamos o objeto de moedas inteiro, não só as keys
    const response = await currencyAPI();
    return response;
  }

  handleEdit = (e) => {
    e.preventDefault();
    const { index, saveEditAction, expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const exchangeCurrent = expenses.find((a) => a.id === index);
    const obj1 = {
      id: index,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates: exchangeCurrent.exchangeRates,
    };
    saveEditAction(obj1);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { saveInfo, expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const currentCoins = await this.allCurrencyAPI();
    const obj = {
      id: expenses.length,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates: currentCoins,
    };
    saveInfo(obj);
    this.setState({
      value: '',
      description: '',
    });
  }

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div className="main-wallet">
        <h1 className="heading-wallet">Adicione suas despesas</h1>
        <form className="div-wallet">
          <label htmlFor="value" className="label-wallet">
            Valor:
            <input
              type="number"
              data-testid="value-input"
              name="value"
              onChange={ this.handleChange }
              value={ value }
              className="input-wallet"
            />
          </label>
          <label htmlFor="description" className="label-wallet">
            Descrição:
            <input
              type="text"
              data-testid="description-input"
              name="description"
              onChange={ this.handleChange }
              value={ description }
              className="input-wallet"
            />
          </label>
          <label htmlFor="currency" className="label-wallet">
            Moeda:
            <select
              id="currency"
              data-testid="currency-input"
              onChange={ this.handleChange }
              name="currency"
              className="input-wallet select"
              value={ currency }
            >
              {currencies.map((coin, index) => (
                <option key={ index }>
                  {coin}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method" className="label-wallet">
            Métodos de pagamento:
            <select
              id="select-method"
              data-testid="method-input"
              onChange={ this.handleChange }
              name="method"
              value={ method }
              className="input-wallet select"
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag" className="label-wallet">
            Categoria:
            <select
              className="input-wallet select"
              data-testid="tag-input"
              onChange={ this.handleChange }
              name="tag"
              value={ tag }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>
        <button
          type="button"
          className="addButton"
          onClick={ editor ? this.handleEdit : this.handleSubmit }
        >
          { editor ? 'Editar despesa' : 'Adicionar despesa' }
        </button>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  index: state.wallet.idToEdit,
  valueEdit: state.wallet.valueEdit,
  exchangeRates: state.wallet.expenses.exchangeRates,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrency: () => dispatch(getCurrencyThunk()),
  saveInfo: (data) => dispatch(saveExpense(data)),
  saveEditAction: (obj) => dispatch(saveEdit(obj)),
});

WalletForm.propTypes = {
  getCurrency: PropTypes.func,
  currencies: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
