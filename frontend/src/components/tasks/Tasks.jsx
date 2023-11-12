import data from '../../assets/sampleData.json'
import c from './tasks.module.scss'
const Tasks = () => {
  return (
    <div className={c.tasksContainer}>
      {data.pots.map((pot) => {
        return (
          <div key={pot.pot_id}>
            <strong>{pot.pot_title}</strong>
            {data.tasks.map((task) => {
              if (task.task_pot_id === pot.pot_id) {
                return (
                  <div key={task.task_id}>
                    <input
                      type="checkbox"
                      id={task.task_title}
                      name={task.task_title}
                    />
                    <label htmlFor={task.task_title}> {task.task_title}</label>
                  </div>
                )
              }
            })}
          </div>
        )
      })}
    </div>
  )
}
export default Tasks
