import { setDate } from "date-fns";
import React, { useState, useEffect, createContext } from "react";

// @ts-ignore
export const Data = React.createContext();

const DataProvider = ({ children }) => {
  // Init all states
  const [tasks, setTasks] = useState(null);
  const [pots, setPots] = useState(null);
  const [blocks, setBlocks] = useState(null);
  const [data, setData] = useState(null);
  const fetchData = async () => {
    const response = await fetch(
      `https://canyknoxvile.pythonanywhere.com/get_all_journe_data`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    const dataResponse = await data.response;
    setData(dataResponse);
  };
  // On first load
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setTasks(data?.tasks);
    setPots(data?.pots);
    setBlocks(data?.blocks);
  }, [data]);

  // Clear db
  async function clearDB() {
    await fetch(`https://canyknoxvile.pythonanywhere.com/reset_db`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    await fetchData();
  }

  async function loadDummy() {
    await fetch(`https://canyknoxvile.pythonanywhere.com/load_dummy_json`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    await fetchData();
  }

  // Create new object
  async function createObject(objectType, body) {
    try {
      const response = await fetch(
        `https://canyknoxvile.pythonanywhere.com/create/${objectType}`,
        {
          method: "POST",
          mode: "cors",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        await fetchData();
        // Handle success if needed
      } else {
        console.error("Request failed:", response.status, response.statusText);
        // Handle errors if needed
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Update an object
  async function updateObject(objectType, id, body) {
    try {
      const response = await fetch(
        `https://canyknoxvile.pythonanywhere.com/update/${objectType}/${id}`,
        {
          method: "POST",
          mode: "cors",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        await fetchData();
        // Handle success if needed
      } else {
        console.error("Request failed:", response.status, response.statusText);
        // Handle errors if needed
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Delete an object
  async function deleteObject(objectType, id) {
    try {
      const response = await fetch(
        `https://canyknoxvile.pythonanywhere.com/remove/${objectType}/${id}`,
        {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        await fetchData();
        // Handle success if needed
      } else {
        console.error("Request failed:", response.status, response.statusText);
        // Handle errors if needed
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <Data.Provider
      value={{
        tasks,
        pots,
        blocks,
        setTasks,
        clearDB,
        loadDummy,
        createObject,
        deleteObject,
        updateObject,
      }}
    >
      {children}
    </Data.Provider>
  );
};

export default DataProvider;
