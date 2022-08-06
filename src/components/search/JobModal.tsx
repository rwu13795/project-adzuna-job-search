import { useState, memo } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectOpenModal,
  selectTargetResult,
  setOpenModal,
} from "../../redux/map/mapSlice";

import styles from "./JobModal.module.css";

function JobModal(): JSX.Element {
  const dispatch = useAppDispatch();

  const openModal = useAppSelector(selectOpenModal);
  const targetJob = useAppSelector(selectTargetResult);

  function handleClose() {
    dispatch(setOpenModal(false));
  }

  function onApplyHandler() {
    window.open(targetJob?.redirect_url);
  }

  function RenderDetail({ tag, detail }: { tag: string; detail: string }) {
    if (tag === "Created") {
      detail = new Date(detail).toDateString();
    }
    if (tag === "Salary") {
      if (detail === "0") {
        detail = "Not available";
      } else {
        detail = "$" + detail;
      }
    }

    return (
      <div className={styles.info}>
        <div>{tag}</div>
        <div>{detail}</div>
      </div>
    );
  }

  return (
    <>
      <Modal
        show={openModal}
        onHide={handleClose}
        className={styles.modal_container}
        size="lg"
      >
        {targetJob && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{targetJob.company.display_name}</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modal_body}>
              <RenderDetail tag="Title" detail={targetJob.title} />
              <RenderDetail tag="Detail" detail={targetJob.description} />
              <RenderDetail
                tag="Salary"
                detail={targetJob.salary_is_predicted}
              />
              <RenderDetail tag="Category" detail={targetJob.category.label} />
              <RenderDetail tag="Created" detail={targetJob.created} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="success" onClick={onApplyHandler}>
                Apply Now
              </Button>
            </Modal.Footer>{" "}
          </>
        )}
      </Modal>
    </>
  );
}

export default memo(JobModal);

/**
 * id: string;
  company: {
    display_name: string;
  };
  description: string;
  title: string;
  salary_is_predicted: string;
  latitude: number;
  longitude: number;
  redirect_url: string;
  category: {
    label: string;
    tag: string;
  };
  location: {
    display_name: string;
  };
  created: string;
  contract_time?: string;
 */
