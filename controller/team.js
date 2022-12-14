const express = require('express')
const mongoose = require('mongoose')

const app = express()

const Team = require('../model/team')
const Player = require('../model/player')
const Match = require('../model/match')

exports.playersPerformance = (req, res, next) => {
  const teamName = req.params.teamName

  Team
    .find({ name: teamName })
    .populate('players')
    .then(([team]) => {
      res.json({ data: team.players })
    })
    .catch(err => console.log(err))
}

exports.teamPerformance = (req, res, next) => {
  const teamName = req.params.teamName
  Team
    .find({ name: teamName })
    .then(([team]) => {
      res.status(200).json({ data: team })
    })
}

exports.matches = (req, res, next) => {
  const teamName = req.params.teamName
  Match
    .find({ $or: [{ team1: teamName }, { team2: teamName }] })
    .then(matches => {
      res.status(200).json({ data: matches })
    })
    .catch(err => console.log(err))
}
exports.addMatch = (req, res, next) => {
  const team1 = req.body.team1
  const team2 = req.body.team2
  const date = req.body.date ? new Date(req.body.date) : new Date().getTime()

  const match = new Match({
    team1,
    team2,
    date,
    goalKeeperSave: 1,
    bestDefance: "A",
    mostAssists: "B",
    highestScorer: "C",
  })

  match
    .save()
    .then(result => {
      res.status(200).json({ data: 'Match created' })
    })
    .catch(err => console.log(err))
}
exports.deleteMatch = (req, res, next) => {
  const { matchId } = req.body
  Match
    .deleteOne(mongoose.Types.ObjectId(matchId))
    .then(result => {
      res.status(200).json({ data: 'Match deleted' })
    })
    .catch(err => console.log(err))
}
exports.updateMatch = (req, res, next) => {
  const { matchId, team1, team2, goalKeeperSave, bestDefance, mostAssists, highestScorer } = req.body
  Match
    .findById(mongoose.Types.ObjectId(matchId))
    .then(match => {
      match.team1 = team1 ? team1 : match.team1
      match.team2 = team2 ? team2 : match.team2
      match.goalKeeperSave = goalKeeperSave ? goalKeeperSave : match.goalKeeperSave
      match.bestDefance = bestDefance ? bestDefance : match.bestDefance
      match.mostAssists = mostAssists ? mostAssists : match.mostAssists
      match.highestScorer = highestScorer ? highestScorer : match.highestScorer
      return match.save()
    })
    .then(result => {
      res.status(200).json({ data: 'Match Updated' })
    })
}


exports.createTeam = (req, res, next) => {
  const teamName = req.body.teamName
  const newTeam = new Team({
    name: teamName,
    totalGoals: 0,
    shotsPG: 0,
    discipline: 1,
    possession: 0,
    pass: 0,
    aerialsWon: 0,
    rating: 0,
    players: [],
    matches: []
  })

  newTeam
    .save()
    .then(result => {
      res.status(201).json({ data: 'Team created' })
    })
    .catch(err => console.log(err))
}
exports.deleteTeam = (req, res, next) => {
  const { teamId } = req.body
  Team
    .deleteOne(mongoose.Types.ObjectId(teamId))
    .then(result => {
      res.status(200).json({ data: 'Team Deleted' })
    })
    .catch(err => console.log(err))
}
exports.updateTeam = (req, res, next) => {
  const { teamId, name, totalGoals, shotsPG, discipline, possession, pass, aerialsWon, rating } = req.body
  console.log(name)
  Team
    .findById(teamId)
    .then(team => {
      team.name = name ? name : team.name
      team.totalGoals = totalGoals ? totalGoals : team.totalGoals
      team.shotsPG = shotsPG ? shotsPG : team.shotsPG
      team.discipline = discipline ? discipline : team.discipline
      team.possession = possession ? possession : team.possession
      team.pass = pass ? pass : team.pass
      team.aerialsWon = aerialsWon ? aerialsWon : team.aerialsWon
      team.rating = rating ? rating : team.rating
      return team.save()
    })
    .then(result => {
      res.status(200).json({ data: 'Team updated' })
    })
    .catch(err => console.log(err))
}

exports.addPlayer = (req, res, next) => {
  const teamName = req.body.teamName
  const playerName = req.body.playerName

  Team
    .find({ name: teamName })
    .then(([team]) => {
      const newPlayer = new Player({
        name: playerName,
        appearance: 0,
        goals: 0,
        assists: 0,
        crossAccuracy: 0,
        keyPasses: 0,
        tackles: 0,
        teamId: team._id
      })
      return newPlayer.save()
    })
    .then(result => {
      res.status(201).json({ data: 'Player created' })
    })
    .catch(err => console.log(err))
}
exports.deletePlayer = (req, res, next) => {
  const { playerId } = req.body
  Player
    .deleteOne(mongoose.Types.ObjectId(playerId))
    .then(result => {
      res.status(200).json({ data: 'Player deleted' })
    })
}

exports.updatePlayer = (req, res, next) => {
  const playerId = req.body.playerId
  const { name, appearance, goals, assists, crossAccuracy, keyPasses, tackles, setup } = req.body

  Player
    .findById(playerId)
    .then(player => {
      player.name = name ? name : player.name
      player.appearance = appearance ? appearance : player.appearance
      player.goals = goals ? goals : player.goals
      player.assists = assists ? assists : player.assists
      player.crossAccuracy = crossAccuracy ? crossAccuracy : player.crossAccuracy
      player.keyPasses = keyPasses ? keyPasses : player.keyPasses
      player.tackles = tackles ? tackles : player.tackles
      player.setup = setup ? setup : player.setup
      return player.save()
    })
    .then(result => {
      res.status(200).json({ data: 'Player updated' })
    })
}

exports.addPlayerToTeam = (req, res, next) => {
  const playerId = req.body.playerId
  const teamName = req.body.teamName

  Team
    .find({ name: teamName })
    .then(([team]) => {
      team.players.push(playerId)
      return team.save()
    })
    .then(result => {
      res.status(201).json({ data: 'Player added to team' })
    })
    .catch(err => console.log(err))
}

exports.deletePlayerFromTeam = (req, res, next) => {
  const playerId = req.body.playerId
  const teamName = req.body.teamName

  Team
    .find({ name: teamName })
    .then(([team]) => {
      team.players = team.players.filter(player => player._id.toString() !== playerId)
      return team.save()
    })
    .then(result => {
      res.status(200).json({ data: 'player deleted from team' })
    })
    .catch(err => console.log(err))
}
