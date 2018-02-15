import React, { Component } from 'react'
import './App.css'

import Roster from './Roster'

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Shinny League Team Builder</h1>
        </header>
        <Roster />
      </div>
    )
  }
}

export default App;
