import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, editButton } from '../redux/actions';

class Table extends Component {
  deleteButton = (values) => {
    const { deleteAction } = this.props;
    const { id } = values;
    deleteAction(id);
  }

  editForm = (values) => {
    const { editAction } = this.props;
    editAction(values);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table className="main-table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        { expenses.map((values) => {
          const moeda = values.exchangeRates[values.currency];
          return (
            <tbody key={ values.id }>
              <tr>
                <td>{values.description}</td>
                <td>{values.tag}</td>
                <td>{values.method}</td>
                <td>{Number(values.value).toFixed(2)}</td>
                <td>{moeda.name}</td>
                <td>{(Math.round(moeda.ask * 100) / 100).toFixed(2)}</td>
                <td>{(values.value * moeda.ask).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <div>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => { this.deleteButton(values); } }
                      className="delete-button"
                    >
                      Excluir
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => { this.editForm(values); } }
                      className="edit-button"
                    >
                      Editar
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          );
        }) }
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteAction: (expense) => dispatch(deleteExpense(expense)),
  editAction: (key) => dispatch(editButton(key)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
