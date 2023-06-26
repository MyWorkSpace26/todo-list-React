import React, { useState } from "react";
import Button from "../UI/Button";
import NewTasksForm from "./NewTasksForm";
import styles from "./NewTasks.module.css";

const NewTasks = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const StratEditingHandler = () => {
    setIsEditing(true);
  };

  const StopEditingHandler = () => {
    setIsEditing(false);
  };

  const saveTaskDataHandler = async (enterredTaskData) => {
    const TaskData = {
      ...enterredTaskData,
      id: Math.floor(Math.random() * 100).toString(),
    };

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://react-http-a5d84-default-rtdb.firebaseio.com/taskslist.json",
        {
          method: "POST",
          body: JSON.stringify(TaskData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      setIsEditing(false);
      props.onaddTasksHandler(TaskData);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
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
