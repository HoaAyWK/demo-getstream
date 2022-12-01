import React from 'react'
import Button from "react-bootstrap/Button";
import { useChatContext } from 'stream-chat-react';
import { useNavigate } from 'react-router-dom';

import UserDetail from './UserDetail';
import { getOffersByJobAction } from '../../store/entities/job';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { handleDate } from '../../common/lib';
import { getAppliesByJob } from '../../store/entities/apply';
const FreelancerApply = ({ job }) => {
    const dispatch = useDispatch();
    const { client, setActiveChannel } = useChatContext();
    const navigate = useNavigate();

    // const { offers, count } = useSelector(state => state.job.getOffersByJob)

    // useEffect(() => {
    //     if (job) {
    //         dispatch(getOffersByJobAction(job.id))
    //     }
    // }, [job])

    const { applies } = useSelector(state => state.apply.getAppliesByJob);
    console.log(applies);

    useEffect(() => {
        dispatch(getAppliesByJob(job.id));
    }, [dispatch, job.id]);

    const handleContactClick = async (e) => {
        const conversation = client.channel('messaging', {
            members: [e.target.value, client.userID]
        });

        await conversation.watch();
        setActiveChannel(conversation);
        navigate('/chat');
    }

    return (
        <div className='freelancerapply__content'>
            <div className=''>
                <h4>
                    {/* Freelancer Applied (<span>{count}</span>) */}
                </h4>
                <div className='freelancerapply__content__postlist'>
                    <div className='freelancerapply__content__postlist__table'>
                        <table>
                            <thead>
                                <tr>
                                    <th scope='col'>Name</th>
                                    <th scope='col'>Applied on</th>
                                    <th scope='col'>Total Rate</th>
                                    <th scope='col'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {applies && applies.map((offer, index) => (
                                    <tr key={index}>
                                        <th scope='row'>
                                            <UserDetail freelancer={offer.freelancer}></UserDetail>
                                        </th>
                                        <td>{handleDate(offer.appliedAt)}</td>
                                        {/* <td>
                                            <div className="d-flex justify-content-center profileuser__information__detail__star-rating--start">
                                                {offer.freelancer.rating.stars} 
                                                <label htmlFor="start1" title="1 start">☆</label>
                                            </div>
                                        </td> */}
                                        <td>
                                            <div>
                                                <Button variant="primary" className="btn-contact-post" value={offer.freelancer.user.id} onClick={handleContactClick}>
                                                    Contact
                                                </Button>
                                                <Button variant="primary" className="btn-reject-post">
                                                    Reject
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FreelancerApply
