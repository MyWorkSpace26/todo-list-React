import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import styles from "../Tasks/TasksList.module.css";
import TaskItem from "../Tasks/TaskItem";
const TasksPag = (props) => {
  const { taskArray } = props;
  const itemsPerPage = 3;
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = taskArray.slice(itemOffset, endOffset);
  let pageCount = Math.ceil(taskArray.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % taskArray.length;
    setItemOffset(newOffset);
  };

  const getIdTaskForDelete = (taskIdforDelete) => {
    props.getIdTaskForDelete(taskIdforDelete);
  };

  const getsaveChangeHandler = (dataChange) => {
    props.getsaveChangeHandler(dataChange);
  };
  return (
    <>
      <ol className={styles["list-tasks"]}>
        {currentItems.map((task) => (
          <TaskItem
            key={task.id}
            idtask={task.id}
            title={task.title}
            range={task.range}
            date={task.date}
            istrue={task.istrue}
            ongetIdTaskForDelete={getIdTaskForDelete}
            ongetsaveChangeHandler={getsaveChangeHandler}
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

export default TasksPag;
