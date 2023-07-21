import React from "react";
import Card from "../UI/Card";
import styles from "../Tasks/Tasks.module.css";
import TopicsList from "./TopicsList";
const Topics = (props) => {
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
  return (
    <Card className={styles["tasks"]}>
      <TopicsList
        temadata={props.temadata}
        ArrayTasks={props.ArrayTasks}
        ontasknumbersinyear={ontasknumbersinyear}
        ondeleteElementwithId={ondeleteElementwithId}
        onsaveChangeElementWithId={onsaveChangeElementWithId}
      />
    </Card>
  );
};

export default Topics;
