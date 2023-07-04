import React from "react";

import styles from "./TasksList.module.css";
import TasksPag from "../UI/TasksPag";
const TasksList = (props) => {
  if (props.TasksArray.length === 0) {
    return (
      <h2 className={styles["tasks-list__fallback"]}>Задачи не найдены</h2>
    );
  }
  const getIdTaskForDelete = (taskIdforDelete) => {
    props.ongetIdTask(taskIdforDelete);
  };

  const getsaveChangeHandler = (dataChange) => {
    props.onsaveChange(dataChange);
  };
  const getsavetemaChangeHandler = (dataChange) => {
    props.onsavetemaChange(dataChange);
  };
  return (
    <TasksPag
      taskArray={props.TasksArray}
      temadata={props.temadata}
      getIdTaskForDelete={getIdTaskForDelete}
      getsaveChangeHandler={getsaveChangeHandler}
      getsavetemaChangeHandler={getsavetemaChangeHandler}
    />
  );
};

export default TasksList;
