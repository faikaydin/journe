import React, { useState, useEffect, createContext } from 'react'

export const Data = React.createContext()

const DataProvider = ({ children }) => {
  // Init all states
  const [tasks, setTasks] = useState(null)
  const [pots, setPots] = useState(null)
  const [blocks, setBlocks] = useState(null)
  const [data, seData] = useState(null)

  // On first load
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:6969/get_all_journe_data`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const data = await response.json()
      const dataResponse = await data.response
      seData(dataResponse)
    }
    fetchData()
  }, [])

  useEffect(() => {
    setTasks(data?.tasks)
    setPots(data?.pots)
    setBlocks(data?.blocks)
  }, [data])

  // Clear db
  async function clearDB() {
    const response = await fetch(`http://localhost:6969/reset_db`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    const dataResponse = await data.response
    console.log(dataResponse)
  }

  async function loadDummy() {
    const response = await fetch(`http://localhost:6969/load_dummy_json`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    const dataResponse = await data.response
    console.log(dataResponse)
  }

  return (
    <Data.Provider
      value={{
        tasks,
        pots,
        blocks,
        clearDB,
        loadDummy,
      }}
    >
      {children}
    </Data.Provider>
  )
}

export default DataProvider
