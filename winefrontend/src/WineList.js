import React, { Component } from 'react'
import Wine from './Wine'
import WineForm from './WineForm'
import * as apiCalls from './api'
import './WineList.css'

class WineList extends Component {
  constructor(props){
    super(props)
    this.state = {
      wines: []
    }
    this.loadWines = this.loadWines.bind(this)
    this.addWine = this.addWine.bind(this)
  }

  componentWillMount(){
    this.loadWines()
  }

  async loadWines(){
    let wines = await apiCalls.getWines()
    this.setState({wines})
  }

  async addWine(val){
    let newWine = await apiCalls.addWine(val)
    this.setState({wines: [...this.state.wines, newWine]})
  }

  async toggleWine(wine) {
    let updatedWine = await apiCalls.toggleWine(wine)
    const wines = this.state.wines.map(w =>
      (w._id === updatedWine._id)
        ? {...w, completed: !w.completed}
        : w
    )
    this.setState({wines: wines})
  }

  async deleteWine(id) {
    await apiCalls.removeWine(id)
    const wines = this.state.wines.filter(wine => wine._id !== id)
    this.setState({wines: wines})
  }

  handleResNotOkay(res) {
    if(res.status >= 400 && res.status < 500) {
      return res.json()
        .then(data => {
          let err = {errorMessage: data.message}
          throw err
        })
    } else {
      let err = {errorMessage: "Server is not responding"}
      throw err
    }
  }


  render() {
    const {wines} = this.state
    let wineList = wines.map(wine => (
      <Wine
        key={wine._id}
        {...wine}
        onDelete={this.deleteWine.bind(this, wine._id)}
        onToggle={this.toggleWine.bind(this, wine)}
      />
    ))
    return(
      <div>
        <h1>WineList</h1>
        <WineForm addWine={this.addWine}/>
        <ul style={style.ul}>
          {wineList}
        </ul>
      </div>
    )
  }
}

const style = {
  ul: {
    color: '#551111',
    listStyle: 'none'
  }
}

export default WineList
