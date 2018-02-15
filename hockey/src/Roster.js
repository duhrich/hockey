import React, { Component } from 'react'
import Player from './Player'
import Team from './Team'
import TeamBuilder from './TeamBuilder'
const rosterUrl = "/yplayers.json"

class Roster extends Component {


    static playersPerTeam = 6

    constructor(props) {
        super(props)
        this.tb = new TeamBuilder()

        this.state = {
            numberOfSquads: this.tb.maxTeams(),
            players: [],
            teams: []
        }

        this.updateState = this.updateState.bind(this)
        this.render = this.render.bind(this)
        this.retrievePlayers = this.retrievePlayers.bind(this)
        this.resetTeams = this.resetTeams.bind(this)
        this.renderForm = this.renderForm.bind(this)
        this.renderRoster = this.renderRoster.bind(this)
        this.renderTeams = this.renderTeams.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.eachPlayer = this.eachPlayer.bind(this)
        this.eachTeam = this.eachTeam.bind(this)


    }


    componentDidMount() {
        this.retrievePlayers()
    }

    updateState() {
        try {
            this.setState({
                players: this.tb.unassignedPlayers(),
                teams: Object.values(this.tb.teams)
            })
        } catch (err) {
            alert("Error updating state", err)
        }
    }

    resetTeams() {
        this.tb.reset()
        this.setState({
            players: this.tb.unassignedPlayers(),
            teams: Object.values(this.tb.teams)
        })
    }

    async retrievePlayers() {
        const url = rosterUrl
        await this.tb.loadFromUrl(url)

        this.updateState()

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

    eachTeam(team, i) {
        return (
            <Team className="Team"
                key={team._id + i}
                index={i+1}
                players={team.players}
                skillSet={this.tb.teamSkillSet(team._id)}
            />
        )
    }


    handleChange(event) {
        this.setState({ numberOfSquads: event.target.value });
    }

    handleSubmit(event) {
        if (this.state.numberOfSquads <= 0) {
            return
        }
        if (this.state.numberOfSquads > this.tb.maxTeams()) {
            alert(`You don't have enough players to generate ${this.state.numberOfSquads} teams!`)
        } else {
            this.tb.generateTeams(this.state.numberOfSquads)

            this.updateState()
        }
        event.preventDefault();
    }



    renderForm() {
        return (
            <div className="Entry" style={this.style}>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Number of Squads:
          <input type="text" value={this.state.numberOfSquads} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Create" />
                </form>
            </div>
        )
    }

    renderRoster() {
        return (<div>{this.tb.unassignedPlayers().map(this.eachPlayer)}</div>)
    }

    renderTeams() {
        return (
            <div>
                {this.state.teams.map(this.eachTeam)}
            </div>
        )
    }

    render() {
        return (           
            <div>     
            <button onClick={this.retrievePlayers}> Load roster </button>
            <button onClick={this.resetTeams}>Reset Teams</button>
            <div className="">
                    {this.renderForm()}
                </div>

            <div className="Container">

                <div className="Column">
                    There are {this.tb.unassignedPlayers().length} players left to assign
                    {this.renderRoster()}
                </div>
                <div className="Column">
                    Teams ({this.state.teams.length}):
                    {this.renderTeams()}
                </div>
            </div>
            </div>
        )
    }

}


export default Roster