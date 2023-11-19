import { useState, useEffect, useContext } from 'react'
import data from '../../assets/sampleData.json'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import c from './tasks.module.scss'
import { Data } from '../providers/DataProvider'
const Tasks = () => {
  const { tasks, pots } = useContext(Data)
  return (
    <div className={c.potsContainer}>
      {pots && (
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry gutter={'2rem'}>
            {pots?.map((pot) => {
              return (
                <div key={pot.pot_id} className={c.potContainer}>
                  <strong>{pot.pot_title}</strong>

                  {tasks?.map((task, i) => {
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
      )}
    </div>
  )
}
export default Tasks
