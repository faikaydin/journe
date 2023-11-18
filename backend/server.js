const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('../data/journe_core/journe_core.db')

// const task = db.each('SELECT * FROM TASK', (err, row) => {
//   console.log(row.task_id + ': ' + row.task_title)
// })
const taskList = []
const blockList = []
const potList = []

db.each('SELECT * FROM TASK', async (err, row) => {
  taskList.push(row)
})
db.each('SELECT * FROM BlOCK', async (err, row) => {
  blockList.push(row)
})
db.each('SELECT * FROM POT', async (err, row) => {
  potList.push(row)
})

app.get('/task', async (req, res) => {
  try {
    res.send({ task: taskList })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.get('/pot', async (req, res) => {
  try {
    res.send({ pot: potList })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.get('/block', async (req, res) => {
  try {
    res.send({ block: blockList })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})
app.listen(8080)
