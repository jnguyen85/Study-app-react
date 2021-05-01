import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Counter.css'

class Counter extends Component {

    constructor() {
        super()
        this.state = {
            counter : 0
        }
        this.increment = this.increment.bind(this)
    }

    increment(by) {
        // console.log(`increment from parent - ${by}`)
        this.setState({
            counter : this.state.counter +  by
        })
    }
    render() {
        return (
          <div className="counter">
            <CounterButton incrementMethod={this.increment} />
            <CounterButton by={5} incrementMethod={this.increment}  />
            <CounterButton by={10} incrementMethod={this.increment}  />
            <span className="count"
                >
                    {this.state.counter}
            </span>
          </div>
        );
    }
}

class CounterButton extends Component {

    constructor() {
        super()
        this.state = {
            counter : 0
        }
        this.increment = this.increment.bind(this)
    }

    increment() {
        this.setState({
            counter : this.state.counter//+  this.props.by
        })

        this.props.incrementMethod(this.props.by)
    }

    render() {
        return (
            <div className="counter">
                <button onClick={this.increment} >+ {this.props.by} </button>
                <span className="count"
                >
                    {this.state.counter}
                </span>
            </div>
        )
    }
}


CounterButton.defaultProps = {
    by : 1
}

CounterButton.propTypes = {
    by : PropTypes.number
}

export default Counter