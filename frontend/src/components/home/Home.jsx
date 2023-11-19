import { useContext } from 'react'
import { Data } from '../providers/DataProvider'

const Home = () => {
  const { clearDB, loadDummy } = useContext(Data)

  return (
    <>
      <button onClick={clearDB}>Clear DB</button>
      <button onClick={loadDummy}>Load Dummy</button>
    </>
  )
}

export default Home
