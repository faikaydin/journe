import { useState, useEffect } from 'react'
import data from '../../assets/sampleData.json'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import c from './tasks.module.scss'
const Tasks = () => {
  const [tasks, setTasks] = useState(null)
  const [pots, setPots] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:8080/task`, { method: 'GET' }).then((res) =>
      res.json().then((data) => {
        setTasks(data)
      })
    )
    fetch(`http://localhost:8080/pot`, { method: 'GET' }).then((res) =>
      res.json().then((data) => {
        setPots(data)
      })
    )
  }, [])

  console.log(tasks)
  return (
    <div className={c.potsContainer}>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry gutter={'2rem'}>
          {pots?.pot?.map((pot) => {
            return (
              <div key={pot.pot_id} className={c.potContainer}>
                <strong>{pot.pot_title}</strong>
                {tasks?.task?.map((task, i) => {
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
                      </div>
                    )
                  }
                })}
                {/* <div className={c.item}>
                  <input type="checkbox" />
                  <span contenteditable="true"></span>
                </div> */}
              </div>
            )
          })}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  )
}
export default Tasks
