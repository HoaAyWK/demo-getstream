import React from 'react'
import Header from '../components/layer/Header'
import Footer from '../components/layer/Footer'
import Introduction from '../components/users/Introduction'
import Overview from '../components/users/Overview'
import UpdateInformation from '../components/users/UpdateInformation'
import Review from '../components/common/Review'
import Contact from '../components/common/Contact'




const ProfileUser = () => {
    let body = (
        <div className='body'>
            <div className='profileuser'>
                <div className='container'>
                    <div className='d-flex'>
                        <div className='col-4 sticky'>
                            <Introduction></Introduction>
                            <UpdateInformation></UpdateInformation>
                        </div>
                        <div className='col-8 px-3'>
                            <div className='profileuser-content'>
                                <Overview></Overview>
                                <div className='profileuser-content__contact'>
                                    <p className='profileuser-content__contact--heading'>Leave me your info</p>
                                    <Contact></Contact>
                                </div>
                            </div>
                                <div className='profileuser-content__review'>
                                    <Review></Review>
                                    <Review></Review>
                                    <Review></Review>
                                    <Review></Review>
                                </div>
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

export default ProfileUser
