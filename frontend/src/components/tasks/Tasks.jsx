import { useState, useEffect, useContext } from 'react'
import { createPortal } from 'react-dom'
import { v4 as uuidv4 } from 'uuid'

import data from '../../assets/sampleData.json'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import c from './tasks.module.scss'
import { Data } from '../providers/DataProvider'
const Tasks = () => {
  const { tasks, pots } = useContext(Data)

  const [taskList, setTaskList] = useState(tasks)
  const [potList, setPotList] = useState(pots)

  console.log(potList)
  // Update temp list when data is available
  useEffect(() => {
    setTaskList(tasks)
    setPotList(pots)
  }, [tasks])

  // Handle tasks
  const [newTask, setNewTask] = useState({
    task_block_id: '',
    task_description: '',
    task_duration: '',
    task_id: '',
    task_pot_id: '',
    task_title: '',
  })
  const handleTaskInputChange = (e) => {
    const { name, value } = e.target
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }))
  }

  const handleAddTask = (e) => {
    e.preventDefault()
    setTaskList([
      ...taskList,
      {
        ...newTask,
        task_pot_id: currentPotId,
        task_id: uuidv4(),
      },
    ])
    setNewTask({
      task_block_id: '',
      task_description: '',
      task_duration: '',
      task_id: '',
      task_pot_id: '',
      task_title: '',
    })
    setAddTask(false)
  }

  const [addTask, setAddTask] = useState(false)
  const [currentPotId, setCurrentPotId] = useState()

  const addTaskHandler = (potId) => {
    setAddTask(true)
    setCurrentPotId(potId)
  }

  //Handle pots
  const [newPot, setNewPot] = useState({
    pot_description: '',
    pot_id: '',
    pot_title: '',
  })
  const [addPot, setAddPot] = useState(false)

  const handlePotInputChange = (e) => {
    const { name, value } = e.target
    setNewPot((prevPot) => ({
      ...prevPot,
      [name]: value,
    }))
  }

  const handleAddPot = (e) => {
    e.preventDefault()
    setPotList([
      ...potList,
      {
        ...newPot,

        pot_id: uuidv4(),
      },
    ])
    setNewPot({
      pot_description: '',
      pot_id: '',
      pot_title: '',
    })
    setAddPot(false)
  }
  const addPotHandler = () => {
    setAddPot(true)
  }
  return (
    <>
      {addTask &&
        createPortal(
          <div className={c.addTaskContainer}>
            <div className={c.addTaskCard}>
              <h1>Add Task</h1>
              <form>
                <input
                  placeholder="Task title"
                  name="task_title"
                  value={newTask.task_title}
                  onChange={(e) => handleTaskInputChange(e)}
                ></input>
                <input
                  placeholder="Task description"
                  name="task_description"
                  value={newTask.task_description}
                  onChange={(e) => handleTaskInputChange(e)}
                ></input>
                <input
                  placeholder="Task duration"
                  name="task_duration"
                  value={newTask.task_duration}
                  onChange={(e) => handleTaskInputChange(e)}
                ></input>
                <button onClick={(e) => handleAddTask(e)}>Add</button>
              </form>
            </div>
          </div>,
          document.getElementById('root')
        )}

      {addPot &&
        createPortal(
          <div className={c.addTaskContainer}>
            <div className={c.addTaskCard}>
              <h1>Add Pot</h1>
              <form>
                <input
                  placeholder="Pot title"
                  name="pot_title"
                  value={newPot.pot_title}
                  onChange={(e) => handlePotInputChange(e)}
                ></input>
                <input
                  placeholder="Pot description"
                  name="pot_description"
                  value={newPot.pot_description}
                  onChange={(e) => handlePotInputChange(e)}
                ></input>

                <button onClick={(e) => handleAddPot(e)}>Add</button>
              </form>
            </div>
          </div>,
          document.getElementById('root')
        )}
      <div className={c.potsContainer}>
        {potList && (
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          >
            <Masonry gutter={'2rem'}>
              {potList?.map((pot) => {
                return (
                  <div key={pot.pot_id} className={c.potContainer}>
                    <strong>{pot.pot_title}</strong>

                    {taskList?.map((task, i) => {
                      if (task.task_pot_id === pot.pot_id) {
                        return (
                          <div key={i} className={c.item}>
                            <input
                              type="checkbox"
                              id={task.task_title}
                              name={task.task_title}
                            />
                            <label htmlFor={task.task_title}>
                              {task.task_title}
                            </label>
                            <span> {task.task_duration}</span>
                          </div>
                        )
                      }
                    })}
                    <button onClick={() => addTaskHandler(pot.pot_id)}>
                      Add task
                    </button>
                  </div>
                )
              })}
            </Masonry>
          </ResponsiveMasonry>
        )}
        <button onClick={addPotHandler}> Add pot</button>
      </div>
    </>
  )
}
export default Tasks
