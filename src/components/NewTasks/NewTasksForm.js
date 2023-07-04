import React, { useState } from "react";

import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../../Helpers/Wrapper";

import styles from "../UI/FormCreate.module.css";
import useInput from "../../hooks/use-input";

import FormCreate from "../UI/FormCreate";

const isNotEmpty = (value) => value.trim() !== "";
const isNotshort = (value) => value.trim().length >= 4;

const NewTasksForm = (props) => {
  const {
    value: enterrdTitle,
    isValid: enteredTitleIsValid,
    hasError: titleInputHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitleInput,
  } = useInput(isNotEmpty && isNotshort);

  const {
    value: enterrdTema,
    isValid: enteredTemaIsValid,
    hasError: temaInputHasError,
    valueChangeHandler: temaChangeHandler,
    inputBlurHandler: temaBlurHandler,
    reset: resetTemaInput,
  } = useInput(isNotEmpty && isNotshort);

  const {
    value: enterrdDate,
    isValid: enterrdDateIsValid,
    hasError: dateInputHasError,
    valueChangeHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
    reset: resetDateInput,
  } = useInput(isNotEmpty);

  const titleinputClasses = titleInputHasError
    ? styles["invalid"]
    : styles["new-task__control"];

  const temainputClasses = temaInputHasError
    ? styles["invalid"]
    : styles["new-task__control"];

  const dateinputClasses = dateInputHasError
    ? styles["invalid"]
    : styles["new-task__control"];

  /*  */
  const [enterrdRange, setEnterrdRange] = useState("50");
  const [errorMessage, setErrorMessage] = useState(""); //object

  const rangeChangeHandler = (event) => {
    setEnterrdRange(event.target.value);
  };

  const errorHandler = () => {
    setErrorMessage(null);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!enteredTitleIsValid || !enteredTemaIsValid) {
      setErrorMessage({
        title: "Неверный ввод",
        message:
          "действительное название или тему, состоящее из 4 символов или более",
      });
      return;
    }
    if (!enterrdDateIsValid) {
      setErrorMessage({
        title: "Неверный ввод",
        message: "действительную дату",
      });
      return;
    }
    const taskData = {
      title: enterrdTitle,
      tema: enterrdTema,
      range: +enterrdRange,
      date: new Date(enterrdDate),
      istrue: true,
    };
    props.onsaveTaskDataHandler(taskData);

    const temaData = {
      tema: enterrdTema,
    };
    props.onsaveTemaDataHandler(temaData);

    resetTitleInput();
    resetDateInput();
    resetTemaInput();
    setEnterrdRange("");
    props.onCancle();
  };

  return (
    <Wrapper>
      {errorMessage && (
        <ErrorModal
          title={errorMessage.title}
          message={errorMessage.message}
          onConfirm={errorHandler}
        />
      )}
      <FormCreate
        onsubmitHandler={submitHandler}
        ontitleinputClasses={titleinputClasses}
        onenterrdTitle={enterrdTitle}
        ontitleChangeHandler={titleChangeHandler}
        ontitleBlurHandler={titleBlurHandler}
        ontitleInputHasError={titleInputHasError}
        /*  */
        onenterrdRange={enterrdRange}
        onrangeChangeHandler={rangeChangeHandler}
        /*  */
        ontemainputClasses={temainputClasses}
        onenterrdTema={enterrdTema}
        ontemaChangeHandler={temaChangeHandler}
        ontemaBlurHandler={temaBlurHandler}
        ontemaInputHasError={temaInputHasError}
        /*  */
        ondateinputClasses={dateinputClasses}
        onenterrdDate={enterrdDate}
        ondateChangeHandler={dateChangeHandler}
        ondateBlurHandler={dateBlurHandler}
        ondateInputHasError={dateInputHasError}
        /*  */
        onCancleForm={props.onCancle}
      />
    </Wrapper>
  );
};

export default NewTasksForm;

/* 
<form onSubmit={submitHandler}>
  <div className={styles["new-task__controls"]}>
    <div className={titleinputClasses}>
      <label htmlFor="title">Название</label>
      <input
        type="text"
        id="title"
        value={enterrdTitle}
        placeholder={enterrdTitle}
        onChange={titleChangeHandler}
        onBlur={titleBlurHandler}
      />
      {titleInputHasError && (
        <p className={styles["error-text"]}>Пожалуйста, введите называние.</p>
      )}
    </div>

    <div className={styles["new-task__control"]}>
      <label htmlFor="range">Важность</label>
      <input
        className={
          enterrdRange <= 50
            ? styles["RangeGreen"]
            : " " || enterrdRange > 50
            ? styles["RangeRed"]
            : ""
        }
        type="range"
        id="range"
        min="0"
        step="10"
        max="100"
        value={enterrdRange}
        placeholder={enterrdRange}
        onChange={rangeChangeHandler}
      />
      <span>{enterrdRange}</span>
    </div>

    <div className={dateinputClasses}>
      <label htmlFor="date">Дата</label>
      <input
        type="date"
        id="date"
        min="2023-01-01"
        max="2026-12-31"
        value={enterrdDate}
        placeholder={enterrdDate}
        onChange={dateChangeHandler}
        onBlur={dateBlurHandler}
      />
      {dateInputHasError && (
        <p className={styles["error-text"]}>Пожалуйста, введите дату.</p>
      )}
    </div>
  </div>
  <div className={styles["new-task__actions"]}>
    <Button type="button" onClick={props.onCancle}>
      cancel
    </Button>
    <Button type="submit">
      Добавить задачу
    </Button>
  </div>
</form>; */
