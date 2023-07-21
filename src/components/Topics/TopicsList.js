import React from "react";
import styles from "../Tasks/TasksList.module.css";
import TemakItem from "./TemaItem";
const TopicsList = (props) => {
  if (props.temadata.length === 0) {
    return <h2 className={styles["tasks-list__fallback"]}>Темы не найдены</h2>;
  }

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
    <>
      <ol className={styles["list-tasks"]}>
        {props.temadata.map((tema) => (
          <TemakItem
            key={tema.id}
            idtask={tema.id}
            titletema={tema.tema}
            ArrayTasks={props.ArrayTasks}
            ontasknumbersinyear={ontasknumbersinyear}
            ondeleteElementwithId={ondeleteElementwithId}
            onsaveChangeElementWithId={onsaveChangeElementWithId}
          />
        ))}
      </ol>
    </>
  );
};

export default TopicsList;

/* with page */
// import React from "react";
// import styles from "../Tasks/TasksList.module.css";
// import TopicsPag from "./TopicsPag";
// const TopicsList = (props) => {
//   if (props.temadata.length === 0) {
//     return <h2 className={styles["tasks-list__fallback"]}>Темы не найдены</h2>;
//   }

//   /* 1 */
//   const ontasknumbersinyear = (year) => {
//     props.ontasknumbersinyear(year);
//   };
//   /* 2 */
//   const ondeleteElementwithId = (taskIdforDelete) => {
//     props.ondeleteElementwithId(taskIdforDelete);
//   };
//   /* 3 */
//   const onsaveChangeElementWithId = (datachangeforsave) => {
//     props.onsaveChangeElementWithId(datachangeforsave);
//   };
//   return (
//     <TopicsPag
//       temadata={props.temadata}
//       ArrayTasks={props.ArrayTasks}
//       ontasknumbersinyear={ontasknumbersinyear}
//       ondeleteElementwithId={ondeleteElementwithId}
//       onsaveChangeElementWithId={onsaveChangeElementWithId}
//     />
//   );
// };

// export default TopicsList;
