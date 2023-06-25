import React, { useState } from "react";
import Button from "../UI/Button";
import NewTasksForm from "./NewTasksForm";
import styles from "./NewTasks.module.css";

const NewTasks = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const StratEditingHandler = () => {
    setIsEditing(true);
  };

  const StopEditingHandler = () => {
    setIsEditing(false);
  };

  const saveTaskDataHandler = (enterredTaskData) => {
    const TaskData = {
      ...enterredTaskData,
      id: Math.floor(Math.random() * 100).toString(),
    };
    setIsEditing(false);
    props.onaddTasksHandler(TaskData);
  };

  return (
    <div className={styles["new-Tasks"]}>
      {!isEditing && (
        <Button onClick={StratEditingHandler}>Добавить новую задачу</Button>
      )}
      {isEditing && (
        <NewTasksForm
          onCancle={StopEditingHandler}
          onsaveTaskDataHandler={saveTaskDataHandler}
        />
      )}
    </div>
  );
};

export default NewTasks;
