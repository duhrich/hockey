import uuid from 'uuid'

class TeamBuilder {

    static SkillSet = ['Shooting', 'Skating', 'Checking']

    constructor() {
        this.numberOfPlayersPerTeam = 6
        this.players = []
        this.teams = {}
        this.snapshots = []
    }

    loadPlayers(playerJson) {
        if (playerJson && playerJson.players && Array.isArray(playerJson.players)) {
            const existingIds = this.allPlayers().map(p => p._id)
            let newPlayers = playerJson.players.filter(p => !existingIds.includes(p._id))

            this.players = [
                ...this.players,
                ...newPlayers
            ]
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
            return true
        } catch (err) {
            console.log("Load failed" + err)
            return false
        }
    }

    getRandomPlayerIndex = () => {
        const min = 0
        const max = this.players.length - 1
        const index = Math.floor(Math.random() * (max - min + 1)) + min
        // return this.players.splice(index, 1)[0]
        return index
    }

    skillBalanceFactor() {
        let ranges = []
        TeamBuilder.SkillSet.forEach(ss => {
            const skillRating = Object.values(this.teams).map(t => this.teamSkillLevel(t._id, ss))
            ranges.push(Math.max(...skillRating) - Math.min(...skillRating))
        })
        return ranges.reduce((a, x) => a + x) / ranges.length
    }


    snapShot() {
        let snapShot = {}
        snapShot.balanceFactor = this.skillBalanceFactor()
        snapShot.teams = {}

        Object.values(this.teams).forEach(t => {
            let teamSnapshot = {}
            teamSnapshot._id = t._id
            teamSnapshot.players = t.players.map(p => p._id)
            snapShot.teams[t._id] = teamSnapshot
        })
        this.snapshots.push(snapShot)
    }

    restoreBestSnapshot() {
        this.reset()
        const minBalanceFactor = Math.min(...this.snapshots.map(s => s.balanceFactor))
        const bestSnapshot = this.snapshots.filter(s => s.balanceFactor === minBalanceFactor)[0]

        Object.values(bestSnapshot.teams).forEach(t => {
            let team = {}
            team._id = t._id
            team.players = []
            t.players.forEach(pid => {
                const index = this.players.map(p => p._id).indexOf(pid)
                const playerToMove = this.players.splice(index, 1)[0]
                team.players.push(playerToMove)
            })
            this.teams[team._id] = team
        })
    }


    generateTeamsRepeatedly(count, iterations = 100) {
        this.snapshots = []
        for (let iter = 0; iter < iterations; iter++) {
            this.generateTeams(count, true)
            this.snapShot()
            this.reset()
        }
        this.restoreBestSnapshot()
        this.snapshots = []
    }

    generateTeams(count, random = false) { //, iterations = 100) {
        if (count > this.maxTeams()) {
            throw new Error(`Not enough players to generate teams`)
        }
        this.reset()
        for (let i = 0; i < count; i++) {
            let team = {}
            team._id = uuid()
            team.players = []
            for (let j = 0; j < this.numberOfPlayersPerTeam; j++) {
                let index = 0
                if (random) {
                    index = this.getRandomPlayerIndex()
                }
                const playerToMove = this.players.splice(index, 1)[0]
                team.players.push(playerToMove)
            }
            this.teams[team._id] = team
        }
    }

    maxTeams() {
        if (this.players) {
            return Math.floor(this.allPlayers().length / this.numberOfPlayersPerTeam)
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
            skillSet.push({ type: ss, rating: this.teamSkillLevel(teamId, ss) })
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
        const teamPlayers = Object.values(this.teams).map(t => t.players)
        return [
            ...this.players,
            ...[].concat(...teamPlayers)
        ]
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
