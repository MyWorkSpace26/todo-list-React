import React from "react";
import styles from "./TaskFilter.module.css";
const TaskFilter = (props) => {
  const dropDownChangeHandler = (event) => {
    props.onfilterChange(event.target.value);
  };
  return (
    <div className={styles["tasks-filter"]}>
      <div className={styles["tasks-filter__control"]}>
        <label>Фильтровать по важности каждого месяца</label>
        <select value={props.selected} onChange={dropDownChangeHandler}>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
        </select>
      </div>
    </div>
  );
};

export default TaskFilter;
