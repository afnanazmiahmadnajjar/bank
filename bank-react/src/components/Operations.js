import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import '../styles/Operations.css'
export default class Operations extends Component {
    constructor() {
        super()
        this.state = {
            amount: null,
            vendor: null,
            category: null,
            id: null,
            typeAc: null,
            flag: false
        }

    }
    handleTransaction = async (e) => {
        let id = e.target.id
        switch (id) {
            case 'category':
                this.setState({ category: e.target.value })
                break;
            case 'vendor':
                this.setState({ vendor: e.target.value })
                break;
            case 'amount':
                this.setState({ amount: parseInt(e.target.value) })
                break;
            default:
                break;
        }
    }
    updateTransactions = async (e) => {
        let typeAc = ''
        let amount = 0
        if (e.target.id === 'withdraw') {
            typeAc = 'withdraw'
            amount -= this.state.amount
            await this.setState({
                typeAc: typeAc,
                amount: amount
            })
            this.props.handleTransaction(this.state)
        }
        else {
            typeAc = 'deposit'
            amount = this.state.amount
            await this.setState({
                typeAc: typeAc,
                amount: amount
            })
            this.props.handleTransaction(this.state)
        }
        await this.setState({
            flag: true
        })
    }
    render() {
        return (
            <div className='form-transc'>
                <input type="text" placeholder='amount' id='amount' onChange={this.handleTransaction} />
                <input type="text" placeholder='category' id='category' onChange={this.handleTransaction} />
                <input type="text" placeholder='vendor' id='vendor' onChange={this.handleTransaction} />
                <button onClick={this.updateTransactions} id='deposit'>Deposit</button>
                <button onClick={this.updateTransactions} id='withdraw'>Withdraw</button>
                {this.state.flag ? <Redirect to='/transactions' /> : ''}
            </div>
        )
    }
}
