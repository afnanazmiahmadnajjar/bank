import React, { Component } from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import Operations from './components/Operations';
import Transactions from './components/Transactions';
import axios from 'axios'
import './App.css'
import Breakdown from './components/Breakdown ';
class App extends Component {
  constructor() {
    super()
    this.state = {
      transactions: [
      ],
      balance: 0
    }
  }
  async getTransactions() {
    return axios.get("http://localhost:3050/transactions")
  }
  async componentDidMount() {
    const response = await this.getTransactions()
    this.updateBalance(response.data)
    this.setState({ transactions: response.data })
  }
  handleTransaction = async (transaction) => {
    let dummytransactions = [...this.state.transactions]
    transaction.id = Math.random()
    dummytransactions.push(transaction)
    await axios({
      method: 'POST',
      url: 'http://localhost:3050/transaction',
      data: transaction
    })
    await this.updateBalance(dummytransactions)

    await this.setState({
      transactions: dummytransactions
    })
    
  }
  updateBalance =  (transactions) => {
    let balance = 0
    transactions.forEach(transaction => {
      balance += transaction.amount
    })
     this.setState({ balance })
  }
  deleteTransatctions = async (idTrans) => {
    await fetch(`http://localhost:3050/transaction/${idTrans}`, {
      method: "DELETE",
    })
    const response = await this.getTransactions()
    await this.updateBalance(response.data)
    await this.setState({
      transactions:response.data
    })
  }
  render() {
    const transactions = this.state.transactions
    const balance = this.state.balance
    return (
      <Router>
        <div>
          <ul>
            <li><Link to='/transactions'>Transactions</Link></li>
            <li><Link to="/operations">Operations</Link></li>
            <li><Link to="/category">Category</Link></li>
            <li><span id={balance > 500 ? 'green' : 'red' }>Balance : {balance}</span> </li>
          </ul>
          <Route path="/category" render={() => <Breakdown transactions={transactions} />} />
          <Route path="/transactions" render={() => <Transactions transactions={transactions} deleteTransatctions={this.deleteTransatctions} />} />
          <Route path="/operations" render={() => <Operations handleTransaction={this.handleTransaction} />} />
        </div>
      </Router>
    )
  }
}

export default App