import React, { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import classDelete from "../UI/ErrorModal.module.css";

import Wrapper from "../../Helpers/Wrapper";

import classForm from "./FormCreate.module.css";

import ErrorModal from "../UI/ErrorModal";

import styles from "./Modal.module.css";

const Modal = (props) => {
  const modalEdit = "modal-Edit";
  let todayDate = props.datetask;
  let month = "" + (todayDate.getMonth() + 1);
  let day = "" + todayDate.getDate();
  let year = todayDate.getFullYear();
  if (day.length < 2) {
    day = "0" + day;
  }
  if (month.length < 2) {
    month = "0" + month;
  }
  let previousDate = `${year}-${month}-${day}`;

  const [changedTitle, setChangedTitle] = useState(props.titletask);
  const [changedTema, setChangedTema] = useState(props.tematask);
  const [changedRange, setChangedRange] = useState(props.rangetask);
  const [changedDate, setChangedDate] = useState(previousDate);
  const [errorMessage, setErrorMessage] = useState(""); //object

  const titleChangeHandler = (event) => {
    setChangedTitle(event.target.value);
  };
  const temaChangeHandler = (event) => {
    setChangedTema(event.target.value);
  };
  const rangeChangeHandler = (event) => {
    setChangedRange(event.target.value);
  };
  const dateChangeHandler = (event) => {
    setChangedDate(event.target.value);
  };

  const errorHandler = () => {
    setErrorMessage(null);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (changedTitle.trim().length === 0) {
      setErrorMessage({
        title: "Неверный ввод",
        message: "действительное название",
      });
      return;
    }
    if (changedDate.trim().length === 0) {
      setErrorMessage({
        title: "Неверный ввод",
        message: "действительную дату",
      });
      return;
    }

    const taskData = {
      id: props.idtask,
      title: changedTitle,
      range: +changedRange,
      tema: changedTema,
      date: new Date(changedDate),
      istrue: true,
    };
    props.onsaveChangeHandler(taskData);
    const temaData = {
      prevtema: props.tematask,
      newtema: changedTema,
    };
    props.onsaveTemaChangeHandler(temaData);
    props.onEditHandler();
  };
  return (
    <Wrapper>
      <div className={styles.modal}>
        {errorMessage && (
          <ErrorModal
            title={errorMessage.title}
            message={errorMessage.message}
            onConfirm={errorHandler}
            modalEdit={modalEdit}
          />
        )}

        {!errorMessage && (
          <>
            <div
              className={classDelete.backdrop}
              onClick={props.onStopEditHandler}
            />
            <Card className={classDelete.modal}>
              <header className={classDelete.header}>
                <h2>Изменить</h2>
              </header>

              <form onSubmit={props.onsubmitHandler}>
                <div className={styles["new-task__controls"]}>
                  <div className={styles["new-task__control"]}>
                    <label>Название</label>
                    <input
                      type="text"
                      value={changedTitle}
                      placeholder={changedTitle}
                      onChange={titleChangeHandler}
                    />
                  </div>
                  <br />
                  <div
                    form={props.idtask}
                    className={styles["new-task__control"]}
                  >
                    <label>Важность</label>
                    <input
                      className={
                        changedRange <= 50
                          ? classForm["RangeGreen"]
                          : " " || props.onenterrdRange > 50
                          ? classForm["RangeRed"]
                          : ""
                      }
                      type="range"
                      min="0"
                      step="10"
                      max="100"
                      value={changedRange}
                      onChange={rangeChangeHandler}
                    />
                    <span>{changedRange}</span>
                  </div>
                  {/*  */}
                  <div className={styles["new-task__control"]}>
                    <label>Тема</label>
                    <input
                      type="text"
                      value={changedTema}
                      placeholder={changedTema}
                      onChange={temaChangeHandler}
                    />
                  </div>
                  <br />
                  {/*  */}
                  <div className={styles["new-task__control"]}>
                    <label>Дата</label>
                    <input
                      type="date"
                      min="2023-01-01"
                      max="2026-12-31"
                      value={changedDate}
                      placeholder={changedDate}
                      onChange={dateChangeHandler}
                    />
                  </div>
                </div>
              </form>

              <footer className={classDelete.actions}>
                <Button onClick={props.onStopEditHandler}>Нет</Button>
                <Button onClick={submitHandler}>Да</Button>
              </footer>
            </Card>
          </>
        )}
      </div>
    </Wrapper>
  );
};

export default Modal;
