import React from "react";
import styles from "./TaskDate.module.css";

const TaskDate = (props) => {
  const month = props.date.toLocaleString("eu-US", { month: "long" });
  const day = props.date.toLocaleString("eu-US", { day: "2-digit" });
  const year = props.date.getFullYear();
  return (
    <div
      className={
        !props.checkistrue
          ? `${styles["task-date"]} ${styles["task-date-chek"]}`
          : styles["task-date"]
      }
    >
      <div className={styles["task-date__month"]}>{month}</div>
      <div className={styles["task-date__year"]}>{day}</div>
      <div className={styles["task-date__day"]}>{year}</div>
    </div>
  );
};

export default TaskDate;
