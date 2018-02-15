import React, { Component } from 'react'
import Player from './Player'
import Skill from './Skill'

class Team extends Component {

    constructor(props) {
        super(props)
        this.state = {
            playersShown: false
        }
        this.eachSkill = this.eachSkill.bind(this)
        this.togglePlayers = this.togglePlayers.bind(this)
    }

    eachSkill(skill, i) {
        const computedKey = this.props._id + " " + skill.type
        return (
            <Skill key={computedKey}
                type={skill.type}
                rating={skill.rating}
            />
        )
    }

    eachPlayer(player, i) {
        return (
            <Player key={player._id}
                index={i}
                name={player.firstName + " " + player.lastName}
                skills={player.skills}
            />
        )
    }

    togglePlayers() {
        this.setState({
            playersShown: !this.state.playersShown
        })
    }


    render() {
        return (
            <div className="Team">
                Team {this.props.index}
                <button className="Button" onClick={this.togglePlayers}>{this.state.playersShown ? "Hide" : "Show"} Players</button>
                <div className="Skills">
                    {this.props.skillSet.map(this.eachSkill)}
                </div>

                <div className="PlayersContainer"
                    style={{
                        display: this.state.playersShown > 0 ? '' : 'none',
                    }}
                >

                    {this.props.players.map(this.eachPlayer)}
                </div>
            </div>
        )
    }

}

export default Team