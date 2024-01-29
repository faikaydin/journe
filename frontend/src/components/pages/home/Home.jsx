import React, { useContext } from 'react'
import { Data } from '../../providers/DataProvider'
import c from './home.module.scss'
import Garden from './garden/Garden'

const Home = () => {
  // Load data
  const { tasks, pots } = useContext(Data)

  // Draw garden
  return (
    <div className={c.pageContainer}>
      <Garden data={{ tasks, pots }} />
    </div>
  )
}

export default Home
