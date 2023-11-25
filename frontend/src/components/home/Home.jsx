import { useContext } from 'react'
import { Data } from '../providers/DataProvider'
import c from './home.module.scss'

const Home = () => {
  const { clearDB, loadDummy } = useContext(Data)

  return (
    <div className={c.pageContainer}>
      <button onClick={clearDB}>Clear DB</button>
      <button onClick={loadDummy}>Load Dummy</button>
    </div>
  )
}

export default Home
