import React, { Component } from 'react'
import '../styles/Category.css'
export default class Breakdown extends Component {
    sum = () => {
        const arr = this.props.transactions
        let cat = {}
        for (let index = 0; index < arr.length; index++) {
            cat[arr[index].category] = arr.filter(f => f.category === arr[index].category).reduce((acc, c) => acc + c.amount, 0)
        }
        return cat
    }
    render() {
        const cat = this.sum()
        return (
            <div>

                {Object.keys(cat).map(
                    c => <div className='category-total'>Category {c} : {cat[c]}</div>
                )}
            </div>
        )
    }
}
