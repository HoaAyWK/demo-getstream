import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Avatar from '../../assets/img/avatar.png';
import Introduction from "../users/Introduction";
import Overview from "../users/Overview";
import Review from "../common/Review";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
const UserDetail = ({freelancer}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <div className="userdetail">
                <div className="userdetail__heading" variant="primary" onClick={handleShow}>
                    <img className="userdetail__heading--avatar" src={Avatar}></img>
                    {freelancer && (freelancer.firstName)}
                </div>

                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Body>
                        <div className='userdetail-block'>
                            <div className='container'>
                                <div className="close" onClick={handleClose}>
                                    <FontAwesomeIcon icon={faClose} />
                                </div>
                                <div className='d-flex'>
                                    <div className='col-4 sticky px-3'>
                                        <Introduction></Introduction>
                                        <div className="d-flex justify-content-between">
                                            <Button variant="primary" className="btn-contact-post">
                                                Contact
                                            </Button>
                                            <Button variant="primary" className="btn-reject-post">
                                                Reject
                                            </Button>
                                        </div>
                                    </div>
                                    <div className='col-8 px-3'>
                                        <div className='userdetail-block-content'>
                                            <Overview></Overview>
                                        </div>
                                        <div className='userdetail-block-content__review'>
                                            <Review></Review>
                                            <Review></Review>
                                            <Review></Review>
                                            <Review></Review>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
}

export default UserDetail
