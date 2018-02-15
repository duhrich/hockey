import uuid from 'uuid'
import Team from './Team';
//let uuid = require('uuid')

class TeamBuilder {

    constructor() {
        console.log("building teambuilder")
        this.numberOfPlayersPerTeam = 6
        this.players = []
        this.teams = {}
    }


    static SkillSet = ['Shooting','Skating','Checking']

    loadPlayers(playerJson) {
        if (playerJson && playerJson.players && Array.isArray(playerJson.players)) {
            const existingIds = this.allPlayers().map(p => p._id)
            let newPlayers = playerJson.players.filter(p => !existingIds.includes(p._id))

            this.players = [
                ...this.players,
                ...newPlayers
            ]

            // console.log(`loaded ${newPlayers.length} players!`)
        } else {
            throw new Error('JSON does not contain players!')
        }
    }

    async loadFromUrl(url) {
        try {
            console.log("fetching", url)
            const response = await fetch(url)
            // console.log(await response.text())
            const json = await response.json()
            this.loadPlayers(json)
        } catch (err) {
            console.log("Load failed" + err)
        }
    }

    generateTeams(count) {
        let ids = []
        if (this.unassignedPlayerCount() < this.numberOfPlayersPerTeam * count) {
            throw new Error(`Not enough players to generate teams`)
        }
        for (let i = 0; i < count; i++) {
            let team = {}
            team._id = uuid()
            ids.push(team._id)
            team.players = []
            for (let j = 0; j < this.numberOfPlayersPerTeam; j++) {
                const playerToMove = this.players.splice(0, 1)[0]
                team.players.push(playerToMove)
            }
            this.teams[team._id] = team
        }
        return ids
    }

    maxTeams() {
        if (this.players) {
            return Math.floor(this.unassignedPlayerCount() / this.numberOfPlayersPerTeam)
        } else {
            return 0
        }
    }

    set playersPerTeam(number) {
        this.numberOfPlayersPerTeam = number
    }


    playerWithId(playerId) {
        if (!playerId || !this.allPlayers().map(p => p._id).includes(playerId)) {
            throw new Error(`Invalid player ID ${playerId}`)
        }
        return this.allPlayers().filter(p => p._id === playerId)[0]
    }

    // skill for player for skill type, or average of all if none specified
    playerSkillLevel(playerId, skillType) {
        let player = this.playerWithId(playerId)
        if (skillType) {
            if (player.skills.map(s => s.type).includes(skillType)) {
                return player.skills.filter(s => s.type === skillType)[0].rating
            } else {
                throw new Error(`Player does not have specified skill ${skillType}`)
            }
        } else {
            return player.skills.map(s => s.rating).reduce((a, x) => a + x) / player.skills.length
        }
    }

    teamSkillLevel(teamId, skillType) {
        if (!teamId || !Object.keys(this.teams).includes(teamId)) {
            throw new Error(`Invalid team ID ${teamId}`)
        }
        let team = this.teams[teamId]
        if (!team) {
            throw new Error("No TEAM!")
        }
        if (team.players.length !== 6) {
            throw new Error(`team error ${team.players[0]._id}`)
        }

        const teamRatings = team.players.map(p => this.playerSkillLevel(p._id, skillType))
        return teamRatings.reduce((a, x) => a + x) / teamRatings.length
    }

    teamSkillSet(teamId) {
        let skillSet = []
        TeamBuilder.SkillSet.forEach(ss => {
            skillSet.push({type:ss,rating:this.teamSkillLevel(teamId,ss)})
        })
        return skillSet
    }


    reset() {
        this.players = this.allPlayers()
        this.teams = {}
    }

    unassignedPlayerCount() {
        if (this.players) {
            return this.players.length
        } else {
            return 0
        }
    }

    unassignedPlayers() {
        return this.players
    }

    allPlayers() {
        // some wacky array processing to take all players from all teams and unassigned players 
        // and put them into a single array
        let playerList = []

        this.players.forEach(p => playerList.push(p))
        Object.values(this.teams).forEach(t => t.players.forEach(p => playerList.push(p)))
        return playerList
        // return [
        //     ...this.players,
        //     // ...[].concat(...teamPlayers).map(a => a[0])
        // ]
    }


    numTeams() {
        return Object.keys(this.teams).length
    }

    teamCount(teamId) {
        if (this.teams[teamId]) {
            return this.teams[teamId].players.length
        }
        else {
            throw new Error('Invalid team ID specified')
        }
    }

}

export default TeamBuilder
// let tb = new TeamBuilder()
// let json = require('../data/xplayers.json')
// tb.loadPlayers(json)
// console.log(tb.allPlayers.length)
// console.log(tb.playerSkillLevel('5a6cfd0ecb8529576fe1dce7','Checking'))


// let t1 = tb.generateTeams(1)[0]
// tb.allPlayers.forEach((p,i) => console.log(i,p._id))

// console.log(tb.playerSkillLevel('5a6cfd0ecb8529576fe1dce7','Checking'))
// console.log("made team",t1)
// tb.allPlayers.forEach(p => console.log(p._id))
// console.log(tb.playerSkillLevel('5a6cfd0ecb8529576fe1dce7','Checking'))
