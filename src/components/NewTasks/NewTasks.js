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

  const createTema = (enterredTaskData, data) => {
    const generatedId = data.name;
    const TemaData = {
      ...enterredTaskData,
      id: generatedId,
    };
    setIsEditing(false);
    props.onaddTemaHandler(TemaData);
  };

  const saveTaskDataHandler = async (enterredTaskData) => {
    sendTaskRequest(
      {
        url: "https://react-http-a5d84-default-rtdb.firebaseio.com/taskslist1.json",
        method: "POST",
        body: enterredTaskData,
        headers: {
          "Content-Type": "application/json",
        },
      },
      createTask.bind(null, enterredTaskData)
    );
  };

  const saveTemaDataHandler = async (enterredTemaData) => {
    for (const value in props.temadata) {
      if (props.temadata[value].tema === enterredTemaData.tema) {
        return;
      }
    }
    sendTaskRequest(
      {
        url: "https://react-http-a5d84-default-rtdb.firebaseio.com/tematasks.json",
        method: "POST",
        body: enterredTemaData,
        headers: {
          "Content-Type": "application/json",
        },
      },
      createTema.bind(null, enterredTemaData)
    );
  };

  let content = isEditing ? (
    <NewTasksForm
      onCancle={StopEditingHandler}
      onsaveTaskDataHandler={saveTaskDataHandler}
      onsaveTemaDataHandler={saveTemaDataHandler}
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
