const express = require('express')

const router = express.Router()

const teamController = require('../controller/team')

// -> get
router.get('/players-performance/:teamName', teamController.playersPerformance)

router.get('/team-performance/:teamName', teamController.teamPerformance)

router.get('/upcomming-matches/:teamName', teamController.matches)

// -> post
// input: teamName
router.post('/create-team', teamController.createTeam)

// input: teamId
router.post('/delete-team', teamController.deleteTeam)

// input: any one or more of the following
// teamId(required), name, totalGoals, shotsPG, discipline, possession, pass, aerialsWon, rating
router.post('/update-team', teamController.updateTeam)

// input: teamName, playerName
router.post('/add-player', teamController.addPlayer)

// input: playerId
router.post('/delete-player', teamController.deletePlayer)

// input: playerId(required), and any one or more of following
// name, appearance, goals, assists, crossAccuracy, keyPasses, tackles, setup
router.post('/update-player', teamController.updatePlayer)

// input: playerId, teamName
router.post('/add-player-to-team', teamController.addPlayerToTeam)

// input: team1, team2, date ( in this format 01-01-1970 00:03:44)
router.post('/add-match', teamController.addMatch)

// input: matchId
router.post('/delete-match', teamController.deleteMatch)

// input: matchId (required) and any one or more of the following
// team1, team2, goalKeeperSave, bestDefance, mostAssists, highestScorer
router.post('/update-match', teamController.updateMatch)

// input: playerId, teamName
router.post('/delete-player-from-team', teamController.deletePlayerFromTeam)

// remaining work

module.exports = router;