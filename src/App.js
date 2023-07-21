import "./App.css";
import React, { useState, useEffect } from "react";
import NewTasks from "./components/NewTasks/NewTasks";

//import Tasks from "./components/Tasks/Tasks";
import useHttp from "./hooks/use-http";
import Topics from "./components/Topics/Topics";
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
    let temaTask = "";
    for (let value in tasks) {
      if (tasks[value].id === idtodelete) {
        temaTask = tasks[value].tema;
      }
    }
    const temaArrayForDelete = [];

    for (const value in tasks) {
      if (tasks[value].tema === temaTask) {
        temaArrayForDelete.push(tema[value]);
      }
    }
    console.log("length is : ", temaArrayForDelete.length);
    let idtemafordelete = "";
    for (const value in tema) {
      if (tema[value].tema === temaTask) {
        idtemafordelete = tema[value].id;
      }
    }

    const deleteTask = (data) => {
      setTema((prevStat) => {
        return [
          ...prevStat.filter((temadelete) => temadelete.id !== idtemafordelete),
        ];
      });
    };

    const DeleteHandler = async () => {
      fetchTasks(
        {
          url: `https://react-http-a5d84-default-rtdb.firebaseio.com/tematasks/${idtemafordelete}.json`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
        deleteTask
      );
    };

    if (temaArrayForDelete.length === 1) {
      DeleteHandler();
    }

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
  };

  const tasknumbersinyear = (fullyear) => {
    getIsTaskYear(fullyear);
  };
  let content = <p>Found no Tasks.</p>;

  if (tasks.length > 0) {
    content = (
      <Topics
        temadata={tema}
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
      <h1 className="App"> Список задач : {tasks.length}</h1>
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
