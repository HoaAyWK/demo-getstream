import React, { useState, useEffect } from "react";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Avatar from '../../assets/img/avatar.png';
import FreelancerApply from "./FreelancerApply";
import TaskList from "./TaskList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import DecriptionJob from "../common/DecriptionJob";
import { handleDate } from "../../common/lib";

const ItemsDetailControl = ({ job }) => {
    const [show, setShow] = useState(false);

    



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            {job && (
                <div className="itemsdetailcontrol">
                    <div className="itemsdetailcontrol__heading" variant="primary" onClick={handleShow}>
                        {job.name}
                    </div>

                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Body>
                            <div className='itemsdetailcontrol'>
                                <div className='container'>
                                    <div className="close" onClick={handleClose}>
                                        <FontAwesomeIcon icon={faClose} />
                                    </div>
                                    <div className='itemsdetailcontrol-block'>
                                        <div className='itemsdetailcontrol__content'>
                                            <div className='itemsdetailcontrol__content__heading'>
                                                <div className='d-flex justify-content-between'>
                                                    <div className='itemsdetailcontrol__content__heading__right d-flex'>
                                                        <img className='itemsdetailcontrol__content__heading__right--avatar pe-4 pb-4' src={Avatar}></img>
                                                        <div>
                                                            <h3 className='itemsdetailcontrol__content__heading__right--header'>
                                                                {job.name}
                                                            </h3>
                                                            {/* tên người đăng */}
                                                            <p className='itemsdetailcontrol__content__heading__right--name'>
                                                                Name
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className='itemsdetailcontrol__content__heading__left d-flex'>
                                                        <div>
                                                            {/* ngày đăng */}
                                                            <p className='itemsdetailcontrol__content__heading__left--date'>
                                                                {handleDate(job.createdAt)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='d-flex justify-content-center'>
                                                    <div className='d-flex'>
                                                        <div className='d-flex itemsdetailcontrol__price'>
                                                            {/* icon đô la */}
                                                            <i></i>
                                                            {/* số tiền target của job */}
                                                            <p className='itemsdetailcontrol__price--number'>
                                                                <span>{job.minPrice}</span>
                                                                <span>-</span>
                                                                <span>{job.maxPrice}</span>
                                                                &nbsp;
                                                                Point
                                                            </p>
                                                        </div>
                                                        <div className=''>
                                                            <p className='itemsdetailcontrol--timeforjob'>Start day: &nbsp;
                                                                <span>{handleDate(job.startDate)}</span>
                                                                &nbsp;
                                                                End day: &nbsp;
                                                                <span>{handleDate(job.endDate)}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className='itemsdetailcontrol__content__body'>
                                                <div className=''>
                                                    <div className='itemsdetailcontrol__content__body__decription mb-5'>
                                                        <h4 className='itemsdetailcontrol__content__body__decription--heading mb-4'>Job Description</h4>
                                                        <p className='itemsdetailcontrol__content__body__decription--detail'>
                                                            {job.description}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className=''>
                                                    <div className='itemsdetailcontrol__content__body__tasklist mb-5'>
                                                        <h4 className='itemsdetailcontrol__content__body__tasklist--heading mb-4'>Common Task Of Job</h4>
                                                        <ul className="itemsdetailcontrol__content__body__tasklist__items">
                                                            <li className="itemsdetailcontrol__content__body__tasklist__items--detail"> tên task 1àhjsahf sahfksa ldhfjkf skjsss sssss sssss sssss ssss ssss ssss sss</li>
                                                            <li className="itemsdetailcontrol__content__body__tasklist__items--detail"> tên task2</li>
                                                            <li className="itemsdetailcontrol__content__body__tasklist__items--detail"> tên task3</li>
                                                            <li className="itemsdetailcontrol__content__body__tasklist__items--detail"> tên task4</li>
                                                            <li className="itemsdetailcontrol__content__body__tasklist__items--detail"> tên task5</li>
                                                            <li className="itemsdetailcontrol__content__body__tasklist__items--detail"> tên task6</li>
                                                            <li className="itemsdetailcontrol__content__body__tasklist__items--detail"> tên task7</li>
                                                            <li className="itemsdetailcontrol__content__body__tasklist__items--detail"> tên task8</li>
                                                            <li className="itemsdetailcontrol__content__body__tasklist__items--detail"> tên task9</li>
                                                            <li className="itemsdetailcontrol__content__body__tasklist__items--detail"> tên task10</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <TaskList></TaskList>
                                            <FreelancerApply></FreelancerApply> */}
                                        {job && <DecriptionJob job={job}></DecriptionJob>}
                                        {/* {job && <TaskList job={job}></TaskList>} */}
                                        {job && <FreelancerApply job={job}></FreelancerApply>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            )}
        </>
    );
}

export default ItemsDetailControl
