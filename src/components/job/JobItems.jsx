import React from 'react'
import Avatar from '../../assets/img/avatar.png';
import { handleDate } from '../../common/lib';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'react-bootstrap'
import { useSelector } from 'react-redux';

import socket from '../../socket/socket';

const JobItems = ({ job }) => {
    const { user } = useSelector(state => state.auth.currentUser);
    const navigate = useNavigate()

    const goJobItemPage = (id) => {
        navigate({
            pathname: '/items',
            search: `id=${id}`
        })
    }

    const handeClickApply = () => {
        const freelancerId = user?.id;
        const username = user?.freelancer?.firstName + " " + user?.freelancer?.lastName;
        const jobId = job?.id;
        const jobName = job?.name;
        const avatar = user?.image;
        socket.emit('apply job', { freelancerId, username, avatar, jobId, jobName, to: job?.employer.user?.id });
    };


    return (
        <div className='w-100'>
            {(job) && (
                <div className='jobitems pulse'>
                    <div className='row mb-3 mb-md-0 block-name'>
                        <div className='col-12 col-md-6'>
                            <div className='d-flex'>
                                <img className='jobitems--avatar' src={Avatar}></img>
                                <div className='jobitems__headinfomation d-flex align-items-center'>
                                    <div>
                                        <p className='jobitems__headinfomation--header m-0'>{job.name}</p>
                                        <p className='jobitems__headinfomation--decription m-0'>{job.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-md-6'>
                            <div className='d-flex jobitems__price'>
                                {/* icon đô la */}
                                <i></i>
                                {/* số tiền target của job */}
                                <p className='jobitems__price--number'>
                                    <span>{job.minPrice}</span>
                                    <span>-</span>
                                    <span>{job.maxPrice}</span>
                                    &nbsp;
                                    Point
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='row mb-3 mb-md-0'>
                        <div className='col-12 col-md-6 mb-2 mb-0'>
                            <a className='jobitems--category text-capitalize'></a>
                        </div>
                        <div className='col-12 col-md-6 mb-2 mb-0'>
                            <p className='jobitems--timeforjob'>
                                <span className='mx-2'>
                                    Start day: &nbsp;
                                    <span>{handleDate(job.startDate)}</span>
                                </span>
                                &nbsp;
                                {/* <span className='mx-2'>
                                    End day: &nbsp;
                                    <span>{handleDate(job.endDate)}</span>
                                </span> */}
                                <button type='button' onClick={handeClickApply}>
                                    Apply
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default JobItems
