import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import Roster from './Roster'

// import TeamBuilder from './TeamBuilder'


class App extends Component {

  constructor() {
    super()
  }

  loadTeam = () => {
    const { tb } = this
    tb.loadFromUrl("/xplayers.json")
  }

  async componentDidMount() {
    // load roster from JSON
    try {
    } catch (err) {
      alert("Error loading roster data")
    }
    
  }


  render() {

    const { loadTeam } = this

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Shinny Teams!</h1>
        </header>

        <Roster />

      </div>

    )
  }
}

export default App;
