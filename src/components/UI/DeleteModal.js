import React from "react";
import ReactDOM from "react-dom";
import Card from "../UI/Card";
import Button from "../UI/Button";
import classDelete from "../UI/ErrorModal.module.css";

const DeleteModal = (props) => {
  const Backdrop = (props) => {
    return <div className={classDelete.backdrop} onClick={props.onStop} />;
  };

  const ModalOverlay = (props) => {
    return (
      <Card className={classDelete.modal}>
        <header className={classDelete.header}>
          <h2>Подтверждать</h2>
        </header>
        <div className={classDelete.content}>
          <p>вы уверены, что хотите удалить задачу: {props.title}</p>
        </div>
        <footer className={classDelete.actions}>
          <Button onClick={props.onStop}>Нет</Button>
          <Button onClick={props.onConfirm}>Да</Button>
        </footer>
      </Card>
    );
  };

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onStop={props.onStopDeleteHandler} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.titletask}
          onStop={props.onStopDeleteHandler}
          onConfirm={props.onDeleteHandler}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default DeleteModal;
