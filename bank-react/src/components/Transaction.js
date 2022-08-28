import React, { Component } from 'react'
import '../styles/Transaction.css'
import '../App.css'

class Transaction extends Component {
  deleteTransatctions = () => {
    this.props.deleteTransatctions(this.props.transaction.id)
  }

  render() {
    const transaction = this.props.transaction
    const id = `s${transaction.typeAc}`
    return (
      <div className='container-transc'>  
        <span>category: {transaction.category} </span>
        <span>vendor: {transaction.vendor} </span>
        <span id={id}>amount: {transaction.amount} </span>
        <button onClick={this.deleteTransatctions}>Delete</button>
      </div>
    )
  }
}
export default Transaction