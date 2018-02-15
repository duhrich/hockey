import React, { Component } from 'react'
import Player from './Player'
import Team from './Team'
import TeamBuilder from './TeamBuilder'
import { Bar } from './styles'

const rosterUrl = "/40players.json"

class Roster extends Component {

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
        this.buildTeams = this.buildTeams.bind(this)
        this.renderRoster = this.renderRoster.bind(this)
        this.renderTeams = this.renderTeams.bind(this)
        this.handleChange = this.handleChange.bind(this)
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
        if (await this.tb.loadFromUrl(url)) {
            this.setState({
                numberOfSquads: this.tb.maxTeams(),
                players: this.tb.unassignedPlayers(),
                teams: Object.values(this.tb.teams)
            })
        }

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
                index={i + 1}
                players={team.players}
                skillSet={this.tb.teamSkillSet(team._id)}
            />
        )
    }


    handleChange(event) {
        this.setState({ numberOfSquads: event.target.value });
    }


    buildTeams() {
        if (isNaN(this.state.numberOfSquads)) {
            alert('Only enter numbers, please')
            return
        }

        if (this.state.numberOfSquads <= 0) {
            alert('Only positive numbers of teams allowed')            
            return
        }
        if (this.state.numberOfSquads > this.tb.maxTeams()) {
            alert(`You don't have enough players to generate ${this.state.numberOfSquads} teams!`)
        } else {
            this.tb.generateTeamsRepeatedly(this.state.numberOfSquads, 100)

            this.updateState()
        }

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

    showBalanceFactor() {
        if (this.state.teams.length > 1) {
            return `Balance Factor ${Math.round(this.tb.skillBalanceFactor())}`
        }
        return ""
    }


    renderControls() {
        if (this.state.teams.length > 0 || this.state.players.length > 0) {
            return (
                <div className="Controls">
                    <div className="Entry" >
                        Number of Teams
                        <input  className="Number" 
                                length='2' 
                                type="number" 
                                value={this.state.numberOfSquads} 
                                onChange={this.handleChange} 
                                />
                        
                        <button className="Button" onClick={this.buildTeams}>Create Teams</button>
                        <button className="Button" onClick={this.resetTeams}>Reset Teams</button>
                    </div>
                </div>
            )
        } else {
            return(
                "No player data was retrieved from the server, please try again later"
            )
        }
    }

    renderWelcome() {
        return (
            <div className="Welcome">
                <div>
                    Welcome to the Shinny League Team Builder!
            <p>
                        Players are automatically retreived from the web.
                        You can choose how many teams are created.
                        The alrorithm attempts to keep the teams fairly balanced.
                        Balance factors are reported for the league, the lower the balance factor, the more balanced the teams.
                        Skills are represented by bars.
                </p>
                </div>
                <div className="Legend">
                    <div><Bar type="Shooting" value={10} />Shooting</div>
                    <div><Bar type="Skating" value={10} />Skating</div>
                    <div><Bar type="Checking" value={10} />Checking</div>
                </div>
            </div>

        )
    }

    render() {
        return (
            <div>
                {this.renderWelcome()}
                {this.renderControls()}
                <div className="Container">
                    <div className="Column"
                        style={{
                            display: this.state.teams.length > 0 ? '' : 'none',
                        }}
                    >
                        {this.renderTeams()}
                        {this.showBalanceFactor()}
                    </div>

                    <div className={this.state.teams.length < 0 ? "Container" : "Column"}>
                        <div className="Unassigned">
                            There are {this.tb.unassignedPlayers().length} players on the waiting list
                    {this.renderRoster()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}


export default Roster