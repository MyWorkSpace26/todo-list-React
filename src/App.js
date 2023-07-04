import "./App.css";
import React, { useState, useEffect } from "react";
import NewTasks from "./components/NewTasks/NewTasks";

import Tasks from "./components/Tasks/Tasks";
import useHttp from "./hooks/use-http";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [tema, setTema] = useState([]);
  const [isTaskYear, getIsTaskYear] = useState("2023");

  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    const transformTasks = (data) => {
      const loadedTasks = [];

      for (const key in data) {
        loadedTasks.push({
          id: key,
          title: data[key].title,
          tema: data[key].tema,
          range: data[key].range,
          date: new Date(data[key].date),
          istrue: data[key].istrue,
        });
      }

      setTasks(loadedTasks);
    };

    fetchTasks(
      {
        url: "https://react-http-a5d84-default-rtdb.firebaseio.com/taskslist1.json",
      },
      transformTasks
    );

    const transformTema = (data) => {
      const loadedTema = [];

      for (const key in data) {
        loadedTema.push({
          id: key,
          tema: data[key].tema,
        });
      }

      setTema(loadedTema);
    };

    fetchTasks(
      {
        url: "https://react-http-a5d84-default-rtdb.firebaseio.com/tematasks.json",
      },
      transformTema
    );
  }, [fetchTasks]);

  const addTasksHandler = async (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  const addTemaHandler = async (tema) => {
    setTema((prevTasks) => prevTasks.concat(tema));
  };

  const deleteElementwithId = (idtodelete) => {
    setTasks((prevStat) => {
      return [...prevStat.filter((taskdelete) => taskdelete.id !== idtodelete)];
    });
  };

  const saveChangeElementWithId = (arraytochange) => {
    setTasks((prevStat) => {
      return [
        ...prevStat.filter((taskdelete) => taskdelete.id !== arraytochange.id),
        arraytochange,
      ];
    });
    console.log(arraytochange);
  };
  const savetemaChangeElementWithId = (arraytochange) => {
    setTema((prevStat) => {
      return [
        ...prevStat.filter((temadelete) => temadelete.id !== arraytochange.id),
        arraytochange,
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
        temadata={tema}
        ontasknumbersinyear={tasknumbersinyear}
        ondeleteElementwithId={deleteElementwithId}
        onsaveChangeElementWithId={saveChangeElementWithId}
        onsavetemaChangeElementWithId={savetemaChangeElementWithId}
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
      <NewTasks
        onaddTasksHandler={addTasksHandler}
        onaddTemaHandler={addTemaHandler}
        temadata={tema}
      />
      {content}
    </>
  );
};

export default App;
