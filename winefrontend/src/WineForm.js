import React, { Component } from 'react'
import './WineForm.css'

class WineForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e){
    this.setState({
      inputValue: e.target.value
    })
  }

  handleSubmit(){
    this.props.addWine(this.state.inputValue)
    this.setState({inputValue: ''})
  }

  render() {
    const {inputValue} = this.state
    return (
      <div>
        <input
          type='text'
          value={inputValue}
          onChange={this.handleChange}
        />
        <button
          onClick={this.handleSubmit}
        >
          Add Wine
        </button>
      </div>
    )
  }
}

export default WineForm
