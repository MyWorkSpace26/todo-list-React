import React, { useState, useEffect } from "react";
import Card from "../UI/Card";
import TasksList from "./TasksList";

import styles from "./Tasks.module.css";
import TaskFilter from "./TaskFilter";
import TasksChart from "./TasksChart";
import { LuPanelLeftClose } from "react-icons/lu";

const Tasks = (props) => {
  const [filterYear, setFilterYear] = useState("2023");

  const filterChangeHandler = (selectedYear) => {
    setFilterYear(selectedYear);
  };

  const filteredTasks = props.ArrayTasks.filter(
    (elementArray) => elementArray.date.getFullYear().toString() === filterYear
  );
  const arrayTasksIsNotCompleted = [];
  const filteredTasksIsCompleted = filteredTasks.filter((elementArray) => {
    if (!elementArray.istrue) {
      arrayTasksIsNotCompleted.push(elementArray);
    }
    return elementArray.istrue === true;
  });

  const filteredTasksCompleted =
    arrayTasksIsNotCompleted.length !== 0
      ? [...filteredTasksIsCompleted, ...arrayTasksIsNotCompleted]
      : filteredTasks;

  const arrayTasksNotImportant = [];
  const filteredTasksIsImportnant = filteredTasksCompleted.filter(
    (elementArray) => {
      if (elementArray.range < 60) {
        arrayTasksNotImportant.push(elementArray);
      }
      return elementArray.range > 50;
    }
  );

  const arrayTasksIsImportant =
    arrayTasksNotImportant.length !== 0
      ? [...filteredTasksIsImportnant, ...arrayTasksNotImportant]
      : filteredTasksCompleted;

  const getIdTask = (taskIdforDelete) => {
    props.ondeleteElementwithId(taskIdforDelete);
  };

  const saveChange = (datachangeforsave) => {
    props.onsaveChangeElementWithId(datachangeforsave);
  };

  useEffect(() => {
    props.ontasknumbersinyear(filteredTasks.length);
  });
  const onStopopenHandler = () => {
    props.onStopopenHandler();
  };
  return (
    <Card className={styles["tasks"]}>
      <p className="App-p">Список задач этой темы: {props.ArrayTasks.length}</p>
      <LuPanelLeftClose
        onClick={onStopopenHandler}
        className={styles["icons"]}
      />
      <TaskFilter selected={filterYear} onfilterChange={filterChangeHandler} />
      <TasksChart taskschart={arrayTasksIsImportant} />
      <TasksList
        TasksArray={arrayTasksIsImportant}
        temadata={props.temadata}
        ongetIdTask={getIdTask}
        onsaveChange={saveChange}
      />
    </Card>
  );
};

export default Tasks;
