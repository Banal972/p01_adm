import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../asset/image/logo.svg"
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/login';

function Header() {

    // 디스패치
    const dispatch = useDispatch();

    // 네비게이터
    const navigate = useNavigate();

    const loginMember = useSelector(state=>state.loginMember);

  return (
    <header className='manager-header'>
        <div className="logo">
            <Link to="main"><img src={logo} alt="로고" /></Link>
        </div>

        <div className="gnb">

            <div className="user-box">

                <div className="user">
                    {loginMember.nickName} 님 어서오세요
                    <button 
                        type='button' 
                        className='logout'
                        onClick={()=>{
                            dispatch(logout());
                            alert('로그아웃이 되었습니다.');
                            navigate('/');
                        }}
                    >
                        로그아웃
                    </button>
                </div>

            </div>

        </div>

    </header>
  )
}

export default Header