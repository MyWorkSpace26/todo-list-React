import React, { useState } from "react";
import styles from "../Tasks/TaskItem.module.css";
import Card from "../UI/Card";
import { AiFillFolderOpen } from "react-icons/ai";
import Tasks from "../Tasks/Tasks";
const TemaItem = (props) => {
  const [isopen, setIsopen] = useState(false);
  const StartopenHandler = () => {
    setIsopen(true);
  };
  const StopopenHandler = () => {
    setIsopen(false);
  };

  const filteredTaskstema = props.ArrayTasks.filter(
    (elementArray) => elementArray.tema === props.titletema
  );

  let contenttema = (
    <Card className={styles["task-item"]}>
      <div className={styles["task-item__description"]}>
        <h2 className={styles["task-item-without-check"]}>{props.titletema}</h2>
        {
          <AiFillFolderOpen
            className={styles["fileopen"]}
            onClick={StartopenHandler}
          />
        }
      </div>
    </Card>
  );
  /* 1 */
  const ontasknumbersinyear = (year) => {
    props.ontasknumbersinyear(year);
  };
  /* 2 */
  const ondeleteElementwithId = (taskIdforDelete) => {
    props.ondeleteElementwithId(taskIdforDelete);
  };
  /* 3 */
  const onsaveChangeElementWithId = (datachangeforsave) => {
    props.onsaveChangeElementWithId(datachangeforsave);
  };
  let content = (
    <Tasks
      ArrayTasks={filteredTaskstema}
      ontasknumbersinyear={ontasknumbersinyear}
      ondeleteElementwithId={ondeleteElementwithId}
      onsaveChangeElementWithId={onsaveChangeElementWithId}
      onStopopenHandler={StopopenHandler}
    />
  );
  return (
    <>
      {!isopen && <li>{contenttema}</li>}
      {isopen && content}
    </>
  );
};

export default TemaItem;
