import React, { Component } from 'react'
import './App.css'

import Roster from './Roster'

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Hockey Team Builder<img className="App-logo" alt="Goalie Mask" src='goalie-mask.png'/></h1>
          
        </header>
        <Roster />
      </div>
    )
  }
}

export default App;
