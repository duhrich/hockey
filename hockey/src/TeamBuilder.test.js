import TeamBuilder from './TeamBuilder'
import testJson from '../data/xplayers.json'
import smallJson from '../data/2players.json'
import Team from './Team';
const tb = new TeamBuilder()

it('initializes with defaults', () => {
    expect(tb).toHaveProperty('numberOfPlayersPerTeam', 6)
    expect(tb.players).toBeDefined()
    expect(tb.unassignedPlayerCount()).toBe(0)
    expect(tb.teams).toBeDefined()
    expect(tb.numTeams()).toBe(0)
})

it('updates team size',() => {
    tb.playersPerTeam = 5
    expect(tb).toHaveProperty('numberOfPlayersPerTeam', 5)
})

it('throws on bad json', () => {
    // const tb = new TeamBuilder()
    const string = "not valid json"
    expect(() => tb.loadPlayers(string)).toThrow('JSON does not contain players!')
    const almostCorrect = "{'players':'still not right'}"
    expect(() => tb.loadPlayers(almostCorrect)).toThrow('JSON does not contain players!')
})

it('loads correct json', () => {
    tb.loadPlayers(testJson)
    expect(tb.unassignedPlayerCount()).toBe(40)
})

it('should not load duplicates', () => {
    tb.loadPlayers(testJson)
    expect(tb.unassignedPlayerCount()).toBe(40)
})

it('calculates max team size', () => {
    tb.playersPerTeam = 6
    expect(tb.maxTeams()).toBe(6)
    tb.playersPerTeam = 5
    expect(tb.maxTeams()).toBe(8)
})

it('refuses to generate more teams than possible', () => {
    tb.loadPlayers(testJson)
    expect(() => tb.generateTeams(100)).toThrow('Not enough players to generate teams')
    expect(tb.numTeams()).toBe(0)
    expect(tb.unassignedPlayerCount()).toBe(40)
})

// let id1,id2

it('generates team', () => {
    tb.playersPerTeam = 6
    tb.generateTeams(1)
    expect(tb.numTeams()).toBe(1)
    expect(tb.unassignedPlayerCount()).toBe(34)
    expect(tb.allPlayers()).toHaveLength(40)
    tb.generateTeams(1)
    expect(tb.numTeams()).toBe(1)
    expect(tb.allPlayers()).toHaveLength(40)
    expect(tb.unassignedPlayerCount()).toBe(34)
})

it('resets', () => {
    tb.reset()
    expect(tb.unassignedPlayerCount()).toBe(40)
    tb.generateTeams(5)
    expect(tb.numTeams()).toBe(5)
    expect(tb.unassignedPlayerCount()).toBe(10)
    tb.reset()
    expect(tb.numTeams()).toBe(0)
    expect(tb.unassignedPlayerCount()).toBe(40)
})

it('finds player skill ratings', () => {    
    expect(() => tb.playerSkillLevel('invalid id')).toThrow('Invalid player ID')
    expect(() => tb.playerSkillLevel('5a6cfd0ecb8529576fe1dce7','Boxing')).toThrow('Player does not have specified skill')
    expect(tb.playerSkillLevel('5a6cfd0ecb8529576fe1dce7','Checking')).toBe(83)
    expect(tb.playerSkillLevel('5a6cfd0ecb8529576fe1dce7')).toBeCloseTo(48.33)
})

it('finds team ratings', () => {
    expect(() => tb.teamSkillLevel('invalid id')).toThrow('Invalid team ID')
    const allnames = tb.allPlayers().reduce((a,p) => a + p.firstName + " ","")
    expect(allnames).toBe("Heather Hendricks Mindy Wheeler Cora Hutchinson Margarita Cervantes Daniel Nunez Raymond Hilary Tameka Anastasia Alma Good Wagner Janie Espinoza Maura Genevieve Trina Berg Mckay Noemi Ada Bartlett Katelyn Mavis Cole Cathryn Hope Wilma Pitts Mayra Schneider Dickson Mccray Sosa Hart ")
    tb.generateTeams(2)
    let [id1,id2] = Object.keys(tb.teams)
    let team1names = tb.teams[id1].players.reduce((a,p) => a + p.firstName + " ","")
    expect(team1names).toBe('Heather Hendricks Mindy Wheeler Cora Hutchinson ')
    let team2names = tb.teams[id2].players.reduce((a,p) => a + p.firstName + " ","")
    expect(team2names).toBe('Margarita Cervantes Daniel Nunez Raymond Hilary ')
    expect(tb.teamSkillLevel(id1)).toBeCloseTo(59.89)
    expect(tb.teamSkillLevel(id1,'Checking')).toBeCloseTo(51.17)
    expect(() => tb.teamSkillLevel(id1,'Boxing')).toThrow('Player does not have specified skill')
    expect(tb.teamSkillLevel(id1,'Shooting')).toBeCloseTo(67.33)
    expect(tb.teamSkillLevel(id1,'Skating')).toBeCloseTo(61.17)
})


it('snapshots and restores', () => {
    tb.snapShot()
    tb.reset()
    expect(tb.unassignedPlayerCount()).toBe(40)
    expect(Object.keys(tb.teams)).toHaveLength(0)
    tb.restoreBestSnapshot()
    let [id1,id2] = Object.keys(tb.teams)
    let team1names = tb.teams[id1].players.reduce((a,p) => a + p.firstName + " ","")
    expect(team1names).toBe('Heather Hendricks Mindy Wheeler Cora Hutchinson ')
})