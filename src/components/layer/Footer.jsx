import React from 'react'
import { ReactComponent as Logo } from '../../assets/img/logo.svg';

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className='container footer__content'>
                <div className='d-flex'>
                    <div className='col-4 footer__content__contact'>
                        <div>
                            <Logo></Logo>
                        </div>
                        <label>Contact us at</label>
                        <a href="#" className='email-for-contact'>buidinhxuanit@gmail.com</a>
                    </div>
                    <div className='col-8'>
                        <div className='d-flex justify-content-center'>
                            <div className="content__nav col-md-8">
                                <div className="content__nav__list d-flex ">
                                    <ul className="content__nav__list__item nav flex-column col-md-4 ">
                                        <div className="content__nav__list__item--header">
                                            Services
                                        </div>
                                        <li className="nav-item">
                                            <a className="nav-link text-normal" href="#">Find Job</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link text-normal" href="#">Create Post</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link text-normal" href="#">Manage Post</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link text-normal" href="#">Profile</a>
                                        </li>
                                    </ul>
                                    <ul className="content__nav__list__item nav flex-column col-md-4">
                                        <div className="content__nav__list__item--header">
                                            Company
                                        </div>
                                        <li className="nav-item">
                                            <a className="nav-link text-normal" href="#">About Us</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link text-normal" href="#">Contact Us</a>
                                        </li>
                                    </ul>
                                    <ul className="content__nav__list__item nav flex-column col-md-4">
                                        <div className="content__nav__list__item--header">
                                            Support
                                        </div>
                                        <li className="nav-item">
                                            <a className="nav-link text-normal" href="#">University Of Technology And Education</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link text-normal" href="#">Faculty For High Quality Training</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link text-normal" href="#">Faculty For Information Technology</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
