import React, { useState } from "react";
import styles from "../Tasks/TasksList.module.css";
import ReactPaginate from "react-paginate";
import TemaItem from "./TemaItem";
const TopicsPag = (props) => {
  const { temadata } = props;
  const itemsPerPage = 3;
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = temadata.slice(itemOffset, endOffset);
  let pageCount = Math.ceil(temadata.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % temadata.length;
    setItemOffset(newOffset);
  };

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
        {currentItems.map((tema) => (
          <TemaItem
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
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      />
    </>
  );
};

export default TopicsPag;
