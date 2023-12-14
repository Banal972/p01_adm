import React from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import "./Main.scss";
import Footer from '../../component/Main/Layout/Footer';
import { Link, useNavigate } from 'react-router-dom';

function Main() {

  const navigate = useNavigate();

  return (
    <>

      <div className="go_admin" onClick={()=>{
        navigate('/manager');
      }}>
        <p>관리자로 <br/>가기</p>
      </div>

      <div className="_main">

        <Swiper className='visual'>
          <SwiperSlide style={{"background" : "#acf"}}>
            <dl>
              <dt>데모사이트1</dt>
              <dd>데모사이트 입니다</dd>
            </dl>
          </SwiperSlide>
          <SwiperSlide style={{"background" : "#ccf"}}>
            <dl>
              <dt>데모사이트2</dt>
              <dd>데모사이트 입니다</dd>
            </dl>
          </SwiperSlide>
          <SwiperSlide style={{"background" : "#dcf"}}>
            <dl>
              <dt>데모사이트3</dt>
              <dd>데모사이트 입니다</dd>
            </dl>
          </SwiperSlide>
        </Swiper>


        <div className="board">
          <div className="_wrap">
            <h2 className="tit">등록한 게시판</h2>

            <div className='table'>
              <div className='lbx'>
                <div className="name">게시판1</div>
                <ul>
                  {
                    [0,1,2,3,4,5].map(e=>(
                      <li key={e}>
                        <Link to={'/'}>
                          <h4>제목</h4>
                          <p className='content'>내용내용내용내용내용내용내용내용내용</p>
                          <p className='date'>2020.10.11</p>
                        </Link>
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className='rbx'>
                <div className="name">게시판2</div>
                <ul>
                  {
                    [0,1,2,3,4,5].map(e=>(
                      <li key={e}>
                        <Link to={'/'}>
                          <h4>제목</h4>
                          <p className='content'>내용내용내용내용내용내용내용내용내용</p>
                          <p className='date'>2020.10.11</p>
                        </Link>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>

          </div>
        </div>


      </div>
      <Footer/>
    </>
  )
}

export default Main