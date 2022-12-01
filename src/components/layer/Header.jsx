import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import styled from '@emotion/styled'

import Login from '../auth/Login';
import Register from '../auth/Register';
import { ReactComponent as Logo } from '../../assets/img/logo.svg';
import { fToNow } from '../../utils/formatTime';
import { useRef } from 'react';
import { useMemo } from 'react';
import socket from '../../socket/socket';
import { useNavigate } from 'react-router-dom';


const Button = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    background-color: transparent;
    outline: 0px;
    border: 0px;
    margin: 0px;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    text-decoration: none;
    text-align: center;
    flex: 0 0 auto;
    font-size: 1.5rem;
    padding: 8px;
    border-radius: 50%;
    overflow: visible;
    color: rgb(99, 115, 129);
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    width: 40px;
    height: 40px;
    &:hover {
        background-color: rgba(99, 115, 129, 0.08);
    }
`;

const IconWrapper = styled.span`
    position: relative;
    display: inline-flex;
    vertical-align: middle;
    flex-shrink: 0;
`;

const Badge = styled.span`
    display: flex;
    flex-flow: row wrap;
    place-content: center;
    align-items: center;
    position: absolute;
    box-sizing: border-box;
    font-family: "Public Sans", sans-serif;
    font-weight: 600;
    font-size: 0.75rem;
    min-width: 20px;
    line-height: 1;
    padding: 0px 6px;
    height: 20px;
    border-radius: 10px;
    z-index: 1;
    transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    background-color: rgb(255, 86, 48);
    color: rgb(255, 255, 255);
    top: 10px;
    right: 10px;
    transform: scale(1) translate(50%, -50%);
    transform-origin: 100% 0%;
`;

const Overlay = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    inset: 0px;
    -webkit-tap-highlight-color: transparent;
    background: transparent;
    z-index: -1;
`;

const CallOut = styled.span`
    z-index: 1;
    width: 12px;
    height: 12px;
    content: "";
    display: block;
    position: absolute;
    transform: rotate(-135deg);
    background: rgb(255, 255, 255);
`;

const NotificationArea = styled.div`
    z-index: 1200;
    opacity: 1;
    transform: none;
    transition: opacity 255ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 170ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    transform-origin: 360px 0px;
    background-color: rgb(255, 255, 255);
    color: rgb(33, 43, 54);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    background-image: none;
    position: absolute;
    min-width: 16px;
    min-height: 16px;
    max-width: calc(100% - 32px);
    max-height: calc(100% - 32px);
    outline: 0px;
    box-shadow: rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) -20px 20px 40px -4px;
    border-radius: 12px;
    padding: 0px;
    width: 360px;
    overflow: inherit;
    margin-left: 6px;
`;


const Header = (props) => {
    const { user, notifications, handleRead, unreadMessages, unreadStreamMessages } = props;
    const [isVisible, setIsVisible] = useState(true);
    const [height, setHeight] = useState(0);
    const bellRef = useRef();
    const [notificationTop, setNotificationTop] = useState(0);
    const [notificationLeft, setNotificationLeft] = useState(0);
    const [openNotification, setOpenNotification] = useState(false);
    const navigate = useNavigate();

    const reverseNotifications = useMemo(() => {
        return notifications ? notifications.slice(0).reverse() : [];
    }, [notifications])

    const handleResize = () => {
        const { bottom, right } = bellRef?.current?.getBoundingClientRect();
        setNotificationTop(bottom);
        setNotificationLeft(right - 360);
    };
    

    useEffect(() => {
        if (bellRef && bellRef.current) {
            const { bottom, right } = bellRef?.current?.getBoundingClientRect();
            setNotificationTop(bottom);
            setNotificationLeft(right - 360);
        }
    }, [bellRef, bellRef.current]);

    useEffect(() => {
        window.addEventListener("scroll", listenToScroll);
        window.addEventListener("resize", handleResize, false);
        return () => {
            window.removeEventListener("scroll", listenToScroll);
            window.removeEventListener("resize", handleResize);
        }
    }, []);


    let heightToHideFrom = 66;
    const listenToScroll = () => {
        const winScroll = document.documentElement.scrollTop;
        setHeight(winScroll);

        if (heightToHideFrom > winScroll) {
            document.getElementById("header").style.top = "0px";

            // console.log(document.getElementById("header"));
        } else {
            document.getElementById("header").style.top = "-70px";
            // document.getElementById("header").css("top", -heightToHideFrom)

        }
        heightToHideFrom = winScroll;
    };

    const handleClickNotification = () => {
        setOpenNotification(prev => !prev);
    };

    const handleCloseNotification = () => {
        socket.emit('mark all as read', {});
        handleRead();
        setOpenNotification(false);
    };

    const handleClickMessageIcon = () => {
        navigate('/chat');
    };

    return (
        <div>
            {

                isVisible
                &&
                <>
                    <header className="sticky-top" id='header'>
                        <div className="header container-main_lvth">
                            <div className="row header-control">
                                <nav className="nav-handle px-2 px-xl-0">
                                    <div className="container d-flex align-items-center justify-content-between p-1 p-lg-0">
                                        <Logo style={{ width: 60 }}/>
                                        <div className="nav-handle__list d-flex" id="navbarSupportedContent">
                                            {user ? (
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBlock: 8 }}>                                            
                                                    <Button onClick={handleClickMessageIcon}>
                                                        <IconWrapper>
                                                            <Icon icon='mdi:message' />
                                                        </IconWrapper>
                                                        {unreadStreamMessages > 0 && (
                                                            <Badge>{unreadStreamMessages}</Badge>
                                                        )}
                                                    </Button>
                                                    <Button ref={bellRef} onClick={handleClickNotification}>
                                                        <IconWrapper>
                                                            <Icon icon="mdi:bell" style={{ fontSize: '12px!important' }} />
                                                        </IconWrapper>
                                                        {unreadMessages > 0 && (
                                                            <Badge>{unreadMessages}</Badge>
                                                        )}
                                                    </Button>
                                                    {user.image ? (
                                                        <div
                                                            style={{
                                                                borderRadius: '50%',
                                                                width: 36,
                                                                height: 36
                                                            }}
                                                        >
                                                            <img src={user.image} alt='user image' width={'36px'} height={'36px'} style={{ borderRadius: '50%' }} />
                                                        </div>
                                                    ) : (

                                                        <div
                                                            style={{
                                                                width: 36,
                                                                height: 36,
                                                                backgroundColor: '#ccc',
                                                                borderRadius: '50%',
                                                                marginInlineStart: 8
                                                            }}
                                                        >
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <ul className="ms-auto mb-2 mb-lg-0 ps-0 d-flex nav-handle__list__items">
                                                    <li className="nav-handle__list__items--name">
                                                        <a className="p-0" aria-current="page" href="home">Home</a>
                                                    </li>
                                                    <li className="nav-handle__list__items--name">
                                                        <a className="p-0" href="article.category ">Jobs</a>
                                                    </li>
                                                    <li className="nav-handle__list__items--name">
                                                    <a className="p-0" href="article.category ">About Us</a>
                                                    </li>
                                                    <li className="nav-handle__list__items--name">
                                                        <Login />
                                                    </li>
                                                    <li className="nav-handle__list__items--name">
                                                        <Register />
                                                    </li>
                                                </ul>
                                            )}
                                            
                                        </div>
                                        <button className="d-block d-none px-2 nav-handle__menu-btn" data-bs-toggle="offcanvas"
                                            data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                                            <i>menu</i>
                                        </button>
                                        <div className="offcanvas offcanvas-end menu-mobile" tabIndex="-1" id="offcanvasRight"
                                            aria-labelledby="offcanvasRightLabel">
                                            <div className="offcanvas-header">
                                                <img className="w-50" src="<?= PUBLIC_ASSETS_URL ?>assets/imgs/logo.png" alt="img-logo"></img>
                                                <button type="button" className="btn close-btn" data-bs-dismiss="offcanvas">
                                                    <i className="lp-close cl-P-red"></i>
                                                </button>
                                            </div>
                                            <div className="offcanvas-body navbar menu-mobile__content">
                                                <ul className="navbar-nav m-0 p-0 w-100 nav-handle__list__items">
                                                    <li className="nav-item nav-handle__list__items--name">
                                                        <a className="p-0" aria-current="page" href="home">TRANG CHỦ</a>
                                                    </li>
                                                    <li className="nav-item nav-handle__list__items--name">
                                                        <a className="p-0" href="article.category ">BÀI VIẾT</a>
                                                    </li>
                                                    <li className="nav-item nav-handle__list__items--name">
                                                        <a className="p-0" href="article.detail">GIỚI THIỆU</a>
                                                    </li>
                                                    <li className="nav-item nav-handle__list__items--name">
                                                        <a className="p-0" href="article.detail">HỖ TRỢ</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </header>
                    <div role='presentation'>
                        {openNotification && (
                            <>
                                <Overlay onClick={handleCloseNotification} style={{ zIndex: 1100, overflow: 'hidden' }}/>
                                <div tabindex="0" data-testid="sentinelStart" />
                                <NotificationArea 
                                    style={{
                                        top: notificationTop,
                                        left: notificationLeft
                                    }}
                                >
                                    <CallOut />
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '16px 20px',
                                        }}
                                    >
                                        <div>
                                            <h6>Notifications</h6>
                                            <p>Your have {notifications?.length} unread messages</p>
                                        </div>
                                        <Button>
                                            <IconWrapper>
                                                <Icon icon='mdi:tick-all' style={{ color: '#078dee'}} />
                                            </IconWrapper>
                                        </Button>
                                    </div>
                                    <div style={{ borderBlockEnd: '1px dashed #ddd' }} />
                                    <div style={{ overflow: 'hidden', borderBottomRightRadius: '12px' }}>
                                        <div style={{ maxHeight: 400, overflowY: 'auto' }}>
                                            {reverseNotifications?.map((notification, index) => {
                                                const style = notification?.isRead ? 
                                                    { display: 'flex',  alignItems: 'center', justifyContent: 'flex-start', padding: '16px 20px' }
                                                    : { display: 'flex',  alignItems: 'center', justifyContent: 'flex-start', padding: '16px 20px', backgroundColor: '#ccc' }
                                                return (
                                                    <div
                                                        key={notification.freelancerId + index}
                                                        style={style}
                                                    >
                                                        <div
                                                            style={{
                                                                width: 48,
                                                                height: 48,
                                                                borderRadius: '50%',
                                                                backgroundColor: '#ccc',
                                                                marginInlineEnd: 8,
                                                                flexShrink: 0
                                                            }}
                                                        >

                                                        </div>
                                                        <div>
                                                            <p>{`${notification.username} just apply to '${notification.jobName}' job`}</p>
                                                            <p>{fToNow(notification.applyDate)}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </NotificationArea>
                            </>
                        )}
                    </div>
                </>
            }


        </div>
    )
}

export default Header
