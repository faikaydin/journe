import React, { useContext } from 'react'
import { Data } from '../../providers/DataProvider'
import c from './reset.module.scss'

const Reset = () => {
  const { clearDB, loadDummy } = useContext(Data)

  return (
    <div className={c.pageContainer}>
      <button onClick={clearDB}>Clear DB</button>
      <button onClick={loadDummy}>Load Dummy</button>
    </div>
  )
}

export default Reset
