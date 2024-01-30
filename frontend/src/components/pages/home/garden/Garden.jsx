import React, { useRef, useEffect, useState } from 'react'
import c from './garden.module.scss'
import { createPortal } from 'react-dom'

const Garden = ({ data }) => {
  //Modal pop up

  const [showModal, setShowModal] = useState()
  const [openPot, setOpenPot] = useState()

  // Draw garden
  const canvasRef = useRef(null)
  const potColors = [
    '#8B4513', // SaddleBrown
    '#A52A2A', // Brown
    '#CD853F', // Peru
    '#D2691E', // Chocolate
    '#8B7355', // RosyBrown
    '#A0522D', // Sienna
    '#D2B48C', // Tan
    '#BC8F8F', // RosyBrown
    '#964B00', // Brown
    '#8B7D6B', // DarkKhaki
  ]

  const greenColors = [
    '#008000', // Green
    '#00FF00', // Lime
    '#006400', // DarkGreen
    '#228B22', // ForestGreen
    '#32CD32', // LimeGreen
    '#7CFC00', // LawnGreen
    '#9ACD32', // YellowGreen
    '#ADFF2F', // GreenYellow
    '#00FA9A', // MediumSpringGreen
    '#2E8B57', // SeaGreen
  ]

  const [potsList, setPotsList] = useState([])
  const generatePot = (pot) => {
    const potSize = 20 + Math.random() * 50
    const potColor = potColors[Math.floor(Math.random() * 10)]

    const x = getRandomNumber(potSize, canvasRef.current.width - potSize)
    const y = canvasRef.current.height - (potSize / 4) * 3

    setPotsList((pre) => [...pre, { pot, potSize, potColor, x, y }])
  }

  const [taskList, setTaskList] = useState([])
  const generateTask = (task) => {
    const taskSize = 10 + Math.random() * 20
    const taskColor = greenColors[Math.floor(Math.random() * 10)]

    let x, y
    for (const i in potsList) {
      if (task.task_pot_id === potsList[i].pot.pot_id) {
        x = potsList[i].x + potsList[i].potSize / 2
        y = potsList[i].y - Math.random() * 400
      }
    }

    setTaskList((pre) => [...pre, { task, taskSize, taskColor, x, y }])
  }

  useEffect(() => {
    for (const i in data.pots) {
      generatePot(data.pots[i])
    }
  }, [data.pots])

  useEffect(() => {
    for (const i in data.tasks) {
      generateTask(data.tasks[i])
    }
  }, [potsList])

  function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min
  }
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const drawPots = () => {
      potsList.forEach(({ potSize, potColor, x, y }) => {
        ctx.fillStyle = potColor
        const boxWidth = potSize
        const boxHeight = potSize

        ctx.fillRect(x, y, boxWidth, boxHeight)
      })
    }

    const drawTasks = () => {
      taskList.forEach(({ taskSize, taskColor, x, y }) => {
        ctx.fillStyle = taskColor

        ctx.beginPath()
        ctx.arc(x, y, taskSize, 0, 2 * Math.PI)
        ctx.fill()
        ctx.closePath()
      })
    }

    // Initial draw
    drawPots()
    drawTasks()
    canvas.onclick = function (event) {
      const clickX = event.clientX - canvas.getBoundingClientRect().left
      const clickY = event.clientY - canvas.getBoundingClientRect().top

      // Check if the click coordinates are within any rectangle
      for (const i in potsList) {
        if (
          clickX >= potsList[i].x &&
          clickX <= potsList[i].x + potsList[i].potSize &&
          clickY >= potsList[i].y &&
          clickY <= potsList[i].y + potsList[i].potSize
        ) {
          setShowModal(true)
          setOpenPot(potsList[i])
          // Add your actions for rectangle click here
          break // Break the loop if a rectangle is clicked
        }
      }
    }

    // Event listener to handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight - 100 // You can adjust the height as needed
      drawPots()
      drawTasks()
    }

    // Attach event listener
    window.addEventListener('resize', handleResize)

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [potsList, taskList])

  // Dynamically set canvas width to 100% of inner width
  const canvasStyle = {
    width: '100%',
    border: '1px solid #ccc',
  }
  return (
    <div className={c.pageContainer}>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight - 100}
        style={canvasStyle}
      ></canvas>
      {showModal &&
        createPortal(
          <div className={c.addTaskContainer}>
            <div className={c.addTaskCard}>
              <div>
                <h2>{openPot.pot.pot_title}</h2>
                <p>{openPot.pot.pot_description}</p>
              </div>
              <div>
                <h3>Tasks</h3>

                {console.log(taskList)}
                {taskList?.map((task, i) => {
                  if (task.task.task_pot_id === openPot.pot.pot_id) {
                    return (
                      <div key={i} className={c.taskItem}>
                        <div>
                          <input
                            type="checkbox"
                            id={task.task.task_title}
                            name={task.task.task_title}
                          />
                          <label htmlFor={task.task.task_title}>
                            {task.task.task_title}
                          </label>
                          <span> {task.task.task_duration}</span>
                        </div>
                      </div>
                    )
                  }
                })}
              </div>
              <button onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>,
          document.getElementById('root')
        )}
    </div>
  )
}

export default Garden
