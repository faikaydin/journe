const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

// Try Python
app.get('/runPythonScript', (req, res) => {
  // Call the Python script here
  const { spawn } = require('child_process')
  const pythonProcess = spawn('python3', ['./hello.py'])
  pythonProcess.stdout.on('data', (data) => {
    // Parse the Python script output as JSON

    const result = JSON.parse(data)
    const defaultDogName = result.DEFAULT_DOG.get_name()
    console.log(`Default Dog Name: ${defaultDogName}`)
  })

  pythonProcess.on('close', (code) => {
    console.log(`Python script exited with code ${code}`)
  })
})

// Set up database
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('../data/journe_core/journe_core.db')

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

// Get functions
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

// Backend Port
app.listen(8080)
