import React, { useState } from "react";
import Button from "../UI/Button";
import NewTasksForm from "./NewTasksForm";
import styles from "./NewTasks.module.css";

import useHttp from "../../hooks/use-http";

const NewTasks = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const StratEditingHandler = () => {
    setIsEditing(true);
  };

  const StopEditingHandler = () => {
    setIsEditing(false);
  };

  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

  const createTask = (enterredTaskData, data) => {
    const generatedId = data.name;
    const TaskData = {
      ...enterredTaskData,
      id: generatedId,
    };
    setIsEditing(false);
    props.onaddTasksHandler(TaskData);
  };

  const saveTaskDataHandler = async (enterredTaskData) => {
    sendTaskRequest(
      {
        url: "https://react-http-a5d84-default-rtdb.firebaseio.com/taskslist.json",
        method: "POST",
        body: enterredTaskData,
        headers: {
          "Content-Type": "application/json",
        },
      },
      createTask.bind(null, enterredTaskData)
    );
  };

  let content = isEditing ? (
    <NewTasksForm
      onCancle={StopEditingHandler}
      onsaveTaskDataHandler={saveTaskDataHandler}
    />
  ) : (
    <Button onClick={StratEditingHandler}>Добавить новую задачу</Button>
  );

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return <div className={styles["new-Tasks"]}>{content}</div>;
};

export default NewTasks;
