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
import List from './router/Layout/List'
import UserWrite from "./router/User/Write"
import BoardWrite from "./router/Board/Write"
import Login from './router/Login/Login'
import TableWrite from "./router/Layout/Write"

// auth 라우터
import Auth from './auth/Auth'

// 테스트 라우터
import UserList from "./router/User/List";


function Manager() {

  const navigate = useNavigate();

  return (
    <>

      <div className="go_admin" onClick={()=>{
        navigate('/');
      }}>
        <p>메인페이지 <br/>로 가기</p>
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

          {/* 게시판 관리 */}
          <Route path='board'>

            <Route index element={<List store={'tableManager'}/>} />

            <Route path='write'>
              <Route index element={<BoardWrite/>}/>
              <Route path=':seq' element={<BoardWrite/>}/>
            </Route>

            <Route path='view' element={<>뷰 페이지</>}/>
            
            <Route path=':table'>
              <Route index element = {<List/>} />
              <Route path='write' element={<TableWrite/>}/>
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