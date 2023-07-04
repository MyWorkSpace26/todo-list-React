import React, { useState, useEffect } from "react";
import Card from "../UI/Card";
import TasksList from "./TasksList";

import styles from "./Tasks.module.css";
import TaskFilter from "./TaskFilter";
import TasksChart from "./TasksChart";

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

  const getIdTask = (taskIdforDelete) => {
    props.ondeleteElementwithId(taskIdforDelete);
  };

  const saveChange = (datachangeforsave) => {
    props.onsaveChangeElementWithId(datachangeforsave);
  };

  useEffect(() => {
    props.ontasknumbersinyear(filteredTasks.length);
  });

  return (
    <Card className={styles["tasks"]}>
      <TaskFilter selected={filterYear} onfilterChange={filterChangeHandler} />
      <TasksChart taskschart={filteredTasksCompleted} />
      <TasksList
        TasksArray={filteredTasksCompleted}
        ongetIdTask={getIdTask}
        onsaveChange={saveChange}
      />
    </Card>
  );
};

export default Tasks;
