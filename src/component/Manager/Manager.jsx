import React from 'react'
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom'

// CSS , SCSS
import "./asset/css/reset.css"
import "./asset/scss/layout.scss"
import "./asset/scss/manager.scss"

// 레이아웃
import Header from './layout/Header'
import Menu from './layout/Menu'
import Footer from './layout/Footer'

// 라우터
import Setting from './router/Setting/Setting'
import Log from './router/Log/Log'
import Main from './router/Main/Main'
import UserWrite from "./router/User/Write"
import BoardWrite from "./router/Board/Write"
import Login from './router/Login/Login'

// auth 라우터
import Auth from './auth/Auth'

// 유저 라우터
import UserList from "./router/User/List";

// 테이블 라우터
import TableList from './router/Table/List';
import TableWrite from "./router/Table/Write";

// 게시판 관리 라우터
import BoardList from "./router/Board/List";

// 배너 관리 라우터
import BannerList from "./router/Banner/List";
import BannerWrtie from "./router/Banner/Write";

// 온라인 문의 라우터
import InquryList from "./router/Inqury/List";
import InquryWrite from "./router/Inqury/Write";


function Manager() {

  const navigate = useNavigate();

  return (
    <>

      <div className="go_admin" onClick={()=>{
        navigate('/');
      }}>
        <p>메인<br/> 페이지 로<br/> 가기</p>
      </div>

      <Routes>

        <Route index element={<Login/>}/>

        <Route path='/' element={

          <Auth>
            <>
              <Header/>
              <div className="manger-main">
                <Menu/>
                <div className="back-box">
                  <Outlet/>
                </div>
              </div>
              <Footer/>
            </>
          </Auth>

        }>

          {/* 대시보드 */}
          <Route path='main' element={<Main/>}/>

          <Route path='banner'>
            <Route index element={<BannerList/>}/>
            <Route path='write'>
              <Route index element={<BannerWrtie/>}/>
              <Route path=':seq' element={<BannerWrtie/>}/>
            </Route>
          </Route>

          {/* 게시판 관리 */}
          <Route path='board'>

            <Route index element={<BoardList store={'tableManager'}/>} />

            <Route path='write'>
              <Route index element={<BoardWrite/>}/>
              <Route path=':seq' element={<BoardWrite/>}/>
            </Route>

            <Route path='view' element={<>뷰 페이지</>}/>
            
            <Route path=':table'>
              <Route index element = {<TableList/>} />
              <Route path='write'>
                <Route index element={<TableWrite/>}/>
                <Route path=':seq' element={<TableWrite/>}/>
              </Route>
            </Route>

          </Route>

          {/* 회원 관리 */}
          <Route path='user'>
            
            <Route index element={<UserList/>}/>

            <Route path='write'>
              <Route index element={<UserWrite/>}/>
              <Route path=':id' element={<UserWrite/>}/>
            </Route>

            <Route path='view' element={<>뷰 페이지</>}/>

          </Route>

          {/* 온라인 문의 */}
          <Route path='inqury'>
            <Route index element={<InquryList/>}></Route>
            <Route path='write'>
              <Route path=':seq' element={<InquryWrite/>}></Route>
            </Route>
          </Route>

          {/* 접속 현황 */}
          <Route path='log' element={<Log/>}></Route>

          {/* 환경설정 */}
          <Route path='setting' element={<Setting/>}></Route>

        </Route>

        <Route path='*' element={<>없는 페이지</>}/>

      </Routes>

    </>
  )
}

export default Manager