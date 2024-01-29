import React, { Component } from 'react'
import './ExpenseList.css';
import ExpenseItem from './ExpenseItem';

export default class ExpenseList extends Component {

  render() {
    
    return (
      <>
        <ul className='list'>
          {this.props.initialExpenses.map(expense => {
            return(
              <ExpenseItem key={expense.id} expense={expense} handleDelete={this.props.handleDelete} />

            )
          })}
   
        </ul>

        <button className='btn'>
          목록 지우기
        </button>

        </>
    )
  }
}
