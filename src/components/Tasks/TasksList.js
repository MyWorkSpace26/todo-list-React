import React from "react";
import TaskItem from "./TaskItem";
import styles from "./TasksList.module.css";

const TasksList = (props) => {
  if (props.TasksArray.length === 0) {
    return <h2 className={styles["tasks-list__fallback"]}>No Tasks Found</h2>;
  }

  const getIdTaskForDelete = (taskIdforDelete) => {
    props.ongetIdTask(taskIdforDelete);
  };

  const getsaveChangeHandler = (dataChange) => {
    props.onsaveChange(dataChange);
  };
  return (
    <ol className={styles["list-tasks"]}>
      {props.TasksArray.map((task) => (
        <TaskItem
          key={task.id}
          idtask={task.id}
          title={task.title}
          range={task.range}
          date={task.date}
          istrue={task.istrue}
          ongetIdTaskForDelete={getIdTaskForDelete}
          ongetsaveChangeHandler={getsaveChangeHandler}
        />
      ))}
    </ol>
  );
};

export default TasksList;
