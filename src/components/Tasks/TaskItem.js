import React, { useState } from "react";
import TaskDate from "./TaskDate";
import Card from "../UI/Card";
import styles from "./TaskItem.module.css";
import Wrapper from "../../Helpers/Wrapper";

import DeleteModal from "../UI/DeleteModal";
import Modal from "../UI/Modal";

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
  const CheckistrueHandler = () => {
    checkistrue ? setCheckistrue(false) : setCheckistrue(true);
  };

  const [isDelete, setIsDelete] = useState(false);
  const StartDeleteHandler = () => {
    setIsDelete(true);
  };
  const StopDeleteHandler = () => {
    setIsDelete(false);
  };
  const DeleteHandler = () => {
    setIsDelete(false);
    props.ongetIdTaskForDelete(props.idtask);
  };

  const saveChangeHandler = (dataChange) => {
    props.ongetsaveChangeHandler(dataChange);
  };
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
      <li>
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
              <button className={styles["edit"]} onClick={StartEditHandler}>
                Edit
              </button>
              <button className={styles["delete"]} onClick={StartDeleteHandler}>
                Delete
              </button>
            </div>
          </div>
        </Card>
      </li>
    </Wrapper>
  );
};

export default TaskItem;
