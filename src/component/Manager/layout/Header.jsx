import React from 'react'
import {AiOutlineBell} from "react-icons/ai"
import {BiChevronDown} from "react-icons/bi"
import { Link } from 'react-router-dom'
import logo from "../asset/image/logo.svg"

function Header() {
  return (
    <header className='manager-header'>
        <div className="logo">
            <Link to="main"><img src={logo} alt="로고" /></Link>
        </div>

        <div className="gnb">

            {/* <div className="alr">
                <AiOutlineBell/>
                <div className="count">1</div>
            </div> */}

            <div className="user-box">

                <div className="user-icon"></div>
                
                <div className="user">
                    닉네임 
                    <div className="down"><BiChevronDown/></div>
                </div>

            </div>

        </div>

    </header>
  )
}

export default Header