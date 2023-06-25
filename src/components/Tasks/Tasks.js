import React, { useState } from "react";
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

  props.ontasknumbersinyear(filteredTasks.length);

  const getIdTask = (taskIdforDelete) => {
    props.ondeleteElementwithId(taskIdforDelete);
  };

  const saveChange = (datachangeforsave) => {
    props.onsaveChangeElementWithId(datachangeforsave);
  };

  return (
    <Card className={styles["tasks"]}>
      <TaskFilter selected={filterYear} onfilterChange={filterChangeHandler} />
      <TasksChart taskschart={filteredTasks} />
      <TasksList
        TasksArray={filteredTasks}
        ongetIdTask={getIdTask}
        onsaveChange={saveChange}
      />
    </Card>
  );
};

export default Tasks;
