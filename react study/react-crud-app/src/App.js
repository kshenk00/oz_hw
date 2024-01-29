import { Component } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

export default class App extends Component {
  //1. State 여기 작성해주기!!
  constructor(props) {
    super(props);
    this.state = { //state를 이용하여 expenses 값들을 기억을 하는것
      expenses: [
        { id: 1, charge: '콜라', amount: 2000},
        { id: 2, charge: '빵', amount: 1000},
        { id: 3, charge: '맥북', amount: 20000}
      ]
    }
  }

  handleDelete = (id) => { //2. 그 다음에 여기 작성해주기
    const newExpense = this.state.expenses.filter(expense => expense.id !== id)

    //4. this.setState({state의 이름: 새로운값을, 즉 지운값})함수를 해줘야 1번의 state를 변경을 해줄수있다. 지운값은 newExpense로 했기에 이걸로 넣어주면 된다.
    this.setState({expenses: newExpense})

  }


  render() {
    return (
    <main className="main-container">
    <div className="sub-container">
      <h1>장바구니</h1>
      <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem' }}>
        { /* Expense Form */} 
        <ExpenseForm />
      </div>
      
      <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem' }}>
        { /* Expense List */} 
        <ExpenseList initialExpenses={/*3. 그 다음엔 여기에*/this.state.expenses} handleDelete={this.handleDelete} /> 
        
      </div>

      <div style={{ display: 'flex', justifyContent: 'start', marginTop: '1rem' }}>
        <p style={{ fontSize: '2rem' }}> 
          총합계:
         
        </p>
      </div>
    </div>
  </main>
    )
  }
}




