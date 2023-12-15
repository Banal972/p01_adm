import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'

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


function Manager() {
  return (
    <>

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

            <Route index element={
              <List 
                select={true} 
                search={true}
                check={true}
                order={true}
                action={true}
                api={'/api/board'}
                seleter={[
                  {
                    text : "게시판 이름",
                    value : "board_name"
                  },
                  {
                    text : "테이블 이름",
                    value : "board_table"
                  },
                  {
                    text : "작성자",
                    value : "writer"
                  }
                ]}
                head={[
                  {
                    text : '대시보드 메인',
                    value : "main"
                  },
                  {
                    text : '게시판 이름',
                    value : "board_name"
                  },
                  {
                    text : '테이블 이름',
                    value : "board_table"
                  },
                  {
                    text : '테마',
                    value : "theme"
                  },
                  {
                    text : '작성자',
                    value : "writer"
                  },
                  {
                    text : '작성날짜',
                    value : "wDate"
                  }
                ]}
              />}
            />

            <Route path='write'>
              <Route index element={<BoardWrite/>}/>
              <Route path=':seq' element={<BoardWrite/>}/>
            </Route>

            <Route path='view' element={<>뷰 페이지</>}/>
            
            <Route path=':table'>
              <Route 
                index 
                element = {
                  <List
                    select={true}
                    seleter={[
                      {
                        text : "제목",
                        value : "title"
                      },
                      {
                        text : "내용",
                        value : "content"
                      },
                      {
                        text : "작성자",
                        value : "writer"
                      }
                    ]}
                    search={true}
                    check={true}
                    order={true}
                    action={true}
                    api={'/api/board/table'}
                    head={[
                      {
                          text : '이미지',
                          value : "imgURL"
                      },
                      {
                          text : '제목',
                          value : "title"
                      },
                      {
                          text : '내용',
                          value : "content"
                      },
                      {
                          text : '작성자',
                          value : "writer"
                      },
                      {
                          text : '작성날짜',
                          value : "wDate"
                      }
                    ]}
                  />
                }
              />
              <Route path='write' element={<TableWrite/>}/>
            </Route>

          </Route>

          {/* 회원 관리 */}
          <Route path='user'>
            
            <Route index element={
              <List 
                seleter={[ // 검색기능
                  {
                    text : "아이디",
                    value : "userID"
                  },
                  {
                    text : "닉네임",
                    value : "nickName"
                  }
                ]}
                head={[ // 테이블 헤더
                  {
                    text : "아이디",
                    value : "userID"
                  },
                  {
                    text : '닉네임',
                    value : "nickName"
                  },
                  {
                    text : '권한',
                    value : "rank"
                  },
                  {
                    text : '작성날짜',
                    value : "wtDate"
                  }
                ]}

                check={true}
                order={true}
                action={true}
                api={'member'}
                
              />}
            />
            
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