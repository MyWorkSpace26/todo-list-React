import "./App.css";
import React, { useState } from "react";
import NewTasks from "./components/NewTasks/NewTasks";

import Tasks from "./components/Tasks/Tasks";

const All_Tasks = [
  {
    id: "1",
    title: "проект по реакту.js",
    range: 100,
    date: new Date(2023, 7, 14),
    istrue: true,
  },
  {
    id: "2",
    title: "Project 2 React",
    range: 20,
    date: new Date(2024, 6, 2),
    istrue: true,
  },
];

const App = () => {
  const [tasks, setTasks] = useState(All_Tasks);
  const [isTaskYear, getIsTaskYear] = useState("2023");
  const addTasksHandler = (task) => {
    setTasks((prevStat) => {
      return [task, ...prevStat];
    });
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

  return (
    <>
      <h1 className="App">📓Список задач : {isTaskYear}</h1>
      <NewTasks onaddTasksHandler={addTasksHandler} />
      <Tasks
        ArrayTasks={tasks}
        ontasknumbersinyear={tasknumbersinyear}
        ondeleteElementwithId={deleteElementwithId}
        onsaveChangeElementWithId={saveChangeElementWithId}
      />
    </>
  );
};

export default App;
