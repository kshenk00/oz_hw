import React, { Component } from 'react'
import './ExpenseItem.css';
import { MdDelete, MdEdit } from 'react-icons/md';

export default class ExpenseItem extends Component {
  render() {
    return (
    <li className='item'>
        <div className='info'>
          <span className='expanse'>빵</span>
          <span className='amount'>100원</span>
      </div>
      <div>
        <button className='edit-btn' >
          <MdEdit />
        </button>
        
        <button className='clear-btn' >
          <MdDelete />
        </button>
      </div>
    </li>
    )
  }
}
