import React, { Component } from 'react'
import Transaction from './Transaction'
import '../App.css'
import '../styles/Transaction.css'

class Transactions extends Component {

  deleteTransatctions=(a)=> {
    this.props.deleteTransatctions(a)
  }
  render() {
    return (
      <div>
        {this.props.transactions.map(
          t => <Transaction transaction={t} key={t.id} deleteTransatctions={this.deleteTransatctions}/>
        )}
      </div>
    )
  }
}
export default Transactions