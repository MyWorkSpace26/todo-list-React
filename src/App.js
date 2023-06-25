import "./App.css";
import React, { useState, useCallback, useEffect } from "react";
import NewTasks from "./components/NewTasks/NewTasks";

import Tasks from "./components/Tasks/Tasks";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isTaskYear, getIsTaskYear] = useState("2023");

  /* Fetching tasks */
  const fetchTasksHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://react-http-a5d84-default-rtdb.firebaseio.com/taskslist.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const loadedTasks = [];

      for (const key in data) {
        loadedTasks.push({
          id: key,
          title: data[key].title,
          range: data[key].range,
          date: new Date(data[key].date),
          istrue: data[key].istrue,
        });
      }

      setTasks(loadedTasks);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchTasksHandler();
  }, [fetchTasksHandler]);

  /* Adding tasks */
  const addTasksHandler = async (task) => {
    const response = await fetch(
      "https://react-http-a5d84-default-rtdb.firebaseio.com/taskslist.json",
      {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    console.log(data);
  };

  const deleteElementwithId = (idtodelete) => {
    setTasks((prevStat) => {
      return [...prevStat.filter((taskdelete) => taskdelete.id !== idtodelete)];
    });
  };

  const saveChangeElementWithId = (arraytochange) => {
    setTasks((prevStat) => {
      return [
        arraytochange,
        ...prevStat.filter((taskdelete) => taskdelete.id !== arraytochange.id),
      ];
    });
  };

  const tasknumbersinyear = (fullyear) => {
    getIsTaskYear(fullyear);
  };

  let content = <p>Found no Tasks.</p>;

  if (tasks.length > 0) {
    content = (
      <Tasks
        ArrayTasks={tasks}
        ontasknumbersinyear={tasknumbersinyear}
        ondeleteElementwithId={deleteElementwithId}
        onsaveChangeElementWithId={saveChangeElementWithId}
      />
    );
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <>
      <h1 className="App"> Список задач : {isTaskYear}</h1>
      <NewTasks onaddTasksHandler={addTasksHandler} />
      {content}
    </>
  );
};

export default App;
