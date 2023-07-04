import React, { useState } from "react";
import TaskDate from "./TaskDate";
import Card from "../UI/Card";
import styles from "./TaskItem.module.css";
import Wrapper from "../../Helpers/Wrapper";

import DeleteModal from "../UI/DeleteModal";
import Modal from "../UI/Modal";

import useHttp from "../../hooks/use-http";

import { GiExtraTime } from "react-icons/gi";

const TaskItem = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const StartEditHandler = () => {
    setIsEdit(true);
  };
  const StopEditHandler = () => {
    setIsEdit(false);
  };
  const EditHandler = () => {
    setIsEdit(false);
    //props.ongetIdTaskForDelete(props.idtask);
  };

  const [checkistrue, setCheckistrue] = useState(props.istrue);

  const [isDelete, setIsDelete] = useState(false);
  const StartDeleteHandler = () => {
    setIsDelete(true);
  };
  const StopDeleteHandler = () => {
    setIsDelete(false);
  };

  const { isLoading, error, sendRequest: updateTaskRequest } = useHttp();

  const updateTask = (dataChange) => {
    const TaskData = {
      ...dataChange,
      id: dataChange.id,
    };
    props.ongetsaveChangeHandler(TaskData);
  };

  const saveChangeHandler = async (dataChange) => {
    updateTaskRequest(
      {
        url: `https://react-http-a5d84-default-rtdb.firebaseio.com/taskslist/${dataChange.id}.json`,
        method: "PUT",
        body: {
          title: dataChange.title,
          date: dataChange.date,
          range: dataChange.range,
          istrue: dataChange.istrue,
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
      updateTask.bind(null, dataChange)
    );
  };

  const CheckistrueHandler = async () => {
    checkistrue ? setCheckistrue(false) : setCheckistrue(true);
    updateTaskRequest(
      {
        url: `https://react-http-a5d84-default-rtdb.firebaseio.com/taskslist/${props.idtask}.json`,
        method: "PUT",
        body: {
          title: props.title,
          date: props.date,
          range: props.range,
          istrue: !checkistrue,
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
      updateTask.bind(null, {
        id: props.idtask,
        title: props.title,
        date: props.date,
        range: props.range,
        istrue: !checkistrue,
      })
    );
  };

  const deleteTask = (data) => {
    setIsDelete(false);
    props.ongetIdTaskForDelete(props.idtask);
  };

  const DeleteHandler = async () => {
    updateTaskRequest(
      {
        url: `https://react-http-a5d84-default-rtdb.firebaseio.com/taskslist/${props.idtask}.json`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
      deleteTask
    );
  };

  let content = (
    <Card
      className={
        !checkistrue
          ? `${styles["task-item"]} ${styles["task-item-check"]}`
          : `${styles["task-item"]}`
      }
    >
      <TaskDate date={props.date} checkistrue={checkistrue} />
      <div className={styles["task-item__description"]}>
        <h2
          onClick={CheckistrueHandler}
          className={
            !checkistrue
              ? `${styles["task-item-without-check"]} ${styles["task-item-check-true"]}`
              : styles["task-item-without-check"]
          }
        >
          {props.title}
        </h2>
        <div className={styles["button-task-container"]}>
          {props.range > 50 ? <GiExtraTime className={styles["icons"]} /> : ""}
          <button className={styles["edit"]} onClick={StartEditHandler}>
            Edit
          </button>
          <button className={styles["delete"]} onClick={StartDeleteHandler}>
            Delete
          </button>
        </div>
      </div>
    </Card>
  );
  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }
  return (
    <Wrapper>
      {isEdit && (
        <Modal
          idtask={props.idtask}
          titletask={props.title}
          datetask={props.date}
          rangetask={props.range}
          //
          onStopEditHandler={StopEditHandler}
          onEditHandler={EditHandler}
          onsaveChangeHandler={saveChangeHandler}
        />
      )}
      {isDelete && (
        <DeleteModal
          onStopDeleteHandler={StopDeleteHandler}
          onDeleteHandler={DeleteHandler}
          titletask={props.title}
        />
      )}
      <li>{content}</li>
    </Wrapper>
  );
};

export default TaskItem;
