import React from 'react'
import Header from '../components/layer/Header'
import Footer from '../components/layer/Footer'
import JobItems from '../components/job/JobItems'
import Baner from '../components/common/Baner'
import { useDispatch, useSelector } from 'react-redux'
import { getJobs, queryJobsAction } from '../store/entities/job'
import { useEffect, useState } from 'react'
import {Pagination} from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'


const SearchList = () => {

    let [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useDispatch()
    const [query, setQuery] = useState({
        limit: 3,
        page: 1,
        status: "Open"
    })
    const [info, setInfo] = useState({
        pageShow: 1,

    })

    const convert2arr = (num) => {
        var result = []
        for (var i=0; i<num; i++){
            result.push(i)
        }

        return result
    }


    const {results, categories, totalPages, totalResults, successQueryJobs} = useSelector(state => state.job.queryJobs)
    const { jobs } = useSelector(state => state.job.getJobs);

    useEffect(() => {
        dispatch(getJobs());
    }, [dispatch]);
    
    useEffect(() => {
        const key = searchParams.get('key')
        if (!key){
            dispatch(queryJobsAction(query))
        }
    }, [!successQueryJobs])

    const changePage = (page) => {

        setInfo({
            ...info,
            pageShow: page
        })
        setQuery({
            ...query,
            page: page
        })
        dispatch(queryJobsAction({
            limit: 3,
            page: page,
            status: "Open"
        }))
    }


    let body = (
        <div className='body'>
            <Baner></Baner>
            <div className='container searchlist'>
                <div className='d-flex'>
                    <div className='col-4 filter'>
                        <div className='filter__jobtype'>
                            <p>Job Type</p>
                            <div className='filter__jobtype--items'>
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                                <label for="html">HTML</label>
                            </div>
                            <div className='filter__jobtype--items'>
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                                <label for="html">HTML</label>
                            </div>
                            <div className='filter__jobtype--items'>
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                                <label for="html">HTML</label>
                            </div>
                        </div>
                        <div className='filter__salary'>
                            <p>Salary</p>
                            <div className='filter__salary--items'>
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                                <label for="html">200</label>
                            </div>
                            <div className='filter__salary--items'>
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                                <label for="html">500</label>
                            </div>
                            <div className='filter__salary--items'>
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                                <label for="html">More Than 500</label>
                            </div>
                        </div>
                        <div className='filter__post-time'>
                            <p>Posted Time</p>
                            <div className='filter__post-time--items'>
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                                <label for="html">Anytime</label>
                            </div>
                            <div className='filter__post-time--items'>
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                                <label for="html">Last Day</label>
                            </div>
                            <div className='filter__post-time--items'>
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                                <label for="html">Last Week</label>
                            </div>
                        </div>
                    </div>
                    <div className='col-8'>
                        <div className='searchlist__content'>
                            <label>
                                {jobs && (<span>{jobs?.length}</span>)}
                                &nbsp;
                                results for
                                &nbsp;
                                <span>UI Designer</span>
                            </label>
                            <ul className='list-result'>
                                {jobs && jobs.map((item, index) => (
                                    <li className='d-flex justify-content-center'>
                                        <JobItems job={item} category={categories[index]}></JobItems>
                                    </li>
                                ))}
                                <Pagination>
                                    {totalPages && convert2arr(totalPages).map((item) => (
                                        <Pagination.Item onClick={() => changePage(item+1)} key={item} active={item+1 == info.pageShow}>{item + 1}</Pagination.Item>
                                    ))}
                                </Pagination>
                                {/* <li className='d-flex justify-content-center'>
                                    <JobItems></JobItems>
                                </li>
                                <li className='d-flex justify-content-center'>
                                    <JobItems></JobItems>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div>
            <Header></Header>
            {body}
            <Footer></Footer>
        </div>
    )
}

export default SearchList
