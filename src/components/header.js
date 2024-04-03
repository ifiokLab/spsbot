import React, { useState,useEffect } from 'react';
import { Navigate, Link, useNavigate,useParams, useLocation } from 'react-router-dom'; // Import useLocation
import { useDispatch } from 'react-redux';
import { setUser } from '../actions/user-action'; // Import actions
import { useSelector } from 'react-redux';
import '../styles/header.css';


const Header= ()=>{
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const [email, setEmail] = useState('');
    const [sidebarOpen,setSideBarOpen] = useState(false);
    const [accountModal,setAccountModal] = useState(false);
    const navigate = useNavigate()

    const toggleSideBar = ()=>{
        setSideBarOpen(!sidebarOpen);
    };
    const toggleAccountModal = ()=>{
        setAccountModal(!accountModal);
    };
    const handleLogout = () => {
        dispatch(setUser(null));
        navigate('/login');
    };
    return(
        <div className='header-wrapper'>
            <div className='logo'>
                <i onClick={toggleSideBar} class="fa-solid fa-bars"></i>
                Logo
            </div>
            <div className='menu-1'>
                <Link to ='/chart/' className='link-tabs'>Binary Bot</Link>
                <Link to ='/metatrader/' className='link-tabs'>MT4 Bot</Link>
                <Link className='link-tabs'>Products</Link>
                <Link className='link-tabs'>News</Link>
               
            </div>
            <div className='menu-2'>
                <div className='user' onClick={toggleAccountModal}>
                    <i class="fa-solid fa-user"></i>
                </div>
                <Link to = '/signup/' className='slash-btn' >Get started</Link>
            </div>

            <div className={`header-sidebar ${sidebarOpen ? 'show' : ''}` }>
                <div className = "header-tab">
                    <div onClick={toggleSideBar} className = "close-icon">
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                </div>
                <Link to ='/chart/' className='tabs'>Binary Bot</Link><br />
                <Link to ='/metatrader/' className='tabs'>MT4 Bot</Link>
                <div className = 'tabs'>
                    <i class="fa-brands fa-product-hunt"></i>
                    <span>Products</span>
                </div>
                <div className = 'tabs'>
                <i class="fa-solid fa-newspaper"></i>
                    <span>News</span>
                </div>
                <div className = 'tabs'>
                    <i class="fa-solid fa-chart-column"></i>
                    <span>Markets</span>
                </div>
            </div>
            <div className={`account-modal ${accountModal ? 'show' : ''}` }>
                <div className = "header-tab">
                    <div onClick={toggleAccountModal} className = "close-icon">
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                </div>
                {user? (
                   <div className='tabs' onClick={handleLogout}>
                        <i class="fa-solid fa-user"></i>
                        <span>Logout</span>
                    </div>
                ):(
                        
                    <Link to = '/login/' className = 'tabs'>
                         <i class="fa-solid fa-user"></i>
                         <span>Sign in</span>
                     </Link>
                    )
                }
                <Link to ='/chart/' className='tabs'>Binary Bot</Link>
                <Link to ='/metatrader/' className='tabs'>MT4 Bot</Link>
                <Link className = 'tabs'>
                    <i class="fa-solid fa-circle-question"></i>
                    <span>Help center</span>
                </Link>
                <Link className = 'tabs'>
                    <i class="fa-solid fa-chart-column"></i>
                    <span>Markets</span>
                </Link>
            </div>
        </div>
    )
};

export default Header;