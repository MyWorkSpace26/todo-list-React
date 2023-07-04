import React from "react";
import styles from "./FormCreate.module.css";
import Button from "../UI/Button";

const FormCreate = (props) => {
  return (
    <form onSubmit={props.onsubmitHandler}>
      <div className={styles["new-task__controls"]}>
        <div className={props.ontitleinputClasses}>
          <label htmlFor="title">Название</label>
          <input
            type="text"
            id="title"
            value={props.onenterrdTitle}
            placeholder={props.onenterrdTitle}
            onChange={props.ontitleChangeHandler}
            onBlur={props.ontitleBlurHandler}
          />
          {props.ontitleInputHasError && (
            <p className={styles["error-text"]}>
              Пожалуйста, введите называние.
            </p>
          )}
        </div>

        <div className={styles["new-task__control"]}>
          <label htmlFor="range">Важность</label>
          <input
            className={
              props.onenterrdRange <= 50
                ? styles["RangeGreen"]
                : " " || props.onenterrdRange > 50
                ? styles["RangeRed"]
                : ""
            }
            type="range"
            id="range"
            min="0"
            step="10"
            max="100"
            value={props.onenterrdRange}
            placeholder={props.onenterrdRange}
            onChange={props.onrangeChangeHandler}
          />
          <span>{props.onenterrdRange}</span>
        </div>

        {/*  */}
        <div className={props.ontemainputClasses}>
          <label htmlFor="tema">Тема</label>
          <input
            type="text"
            id="tema"
            value={props.onenterrdTema}
            placeholder={props.onenterrdTema}
            onChange={props.ontemaChangeHandler}
            onBlur={props.ontemaBlurHandler}
          />
          {props.ontemaInputHasError && (
            <p className={styles["error-text"]}>Пожалуйста, введите тему.</p>
          )}
        </div>
        {/*  */}

        <div className={props.ondateinputClasses}>
          <label htmlFor="date">Дата</label>
          <input
            type="date"
            id="date"
            min="2023-01-01"
            max="2026-12-31"
            value={props.onenterrdDate}
            placeholder={props.onenterrdDate}
            onChange={props.ondateChangeHandler}
            onBlur={props.ondateBlurHandler}
          />
          {props.ondateInputHasError && (
            <p className={styles["error-text"]}>Пожалуйста, введите дату.</p>
          )}
        </div>
      </div>
      <div className={styles["new-task__actions"]}>
        <Button type="button" onClick={props.onCancleForm}>
          cancel
        </Button>
        <Button type="submit" /* ifdisabled={!formIsValid} */>
          Добавить задачу
        </Button>
      </div>
    </form>
  );
};

export default FormCreate;

/* 
 <form onSubmit={props.onsubmitHandler}>
      <div className={styles["new-task__controls"]}>
        <div className={styles["new-task__control"]}>
          <label>Название</label>
          <input
            type="text"
            value={props.onenterrdTitle}
            placeholder={props.onenterrdTitle}
            onChange={props.ontitleChangeHandler}
          />
        </div>

        <div className={styles["new-task__control"]}>
          <label>Важность</label>
          <input
            className={
              props.onenterrdRange <= 50
                ? styles["RangeGreen"]
                : " " || props.onenterrdRange > 50
                ? styles["RangeRed"]
                : ""
            }
            type="range"
            min="0"
            step="10"
            max="100"
            value={props.onenterrdRange}
            placeholder={props.onenterrdRange}
            onChange={props.onrangeChangeHandler}
          />
          <span>{props.onenterrdRange}</span>
        </div>

        <div className={styles["new-task__control"]}>
          <label>Дата</label>
          <input
            type="date"
            min="2023-01-01"
            max="2026-12-31"
            value={props.onenterrdDate}
            placeholder={props.onenterrdDate}
            onChange={props.ondateChangeHandler}
          />
        </div>
      </div>
      <div className={styles["new-task__actions"]}>
        <Button type="button" onClick={props.onCancleForm}>
          cancel
        </Button>
        <Button type="submit">Добавить задачу</Button>
      </div>
    </form>
*/
