import React, { useEffect, useState } from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import "./asset/scss/Main.scss";
import Footer from '../../component/Main/Layout/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Main() {

  const navigate = useNavigate();

  const member = useSelector(state=>state.member);
  const [memberData,setMemberData] = useState([]);

  useEffect(()=>{
    const splice = member.slice(0,10);
    setMemberData(splice);
  },[]);

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


        <section className="sec">
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

          <div className="board">
            <div className="_wrap">
              <h2 className="tit">커뮤니티</h2>

              <div className='table'>
                <div className='lbx'>
                  <div className="name">유저</div>
                  <ul>
                    {
                      memberData.map(e=>(
                        <li key={e}>
                          <h4>{e.userID}</h4>
                          <p className='date'>{e.wtDate}</p>
                        </li>
                      ))
                    }
                  </ul>
                </div>
                <div className='rbx'>
                  <div className="name">온라인 문의</div>
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
        </section>

        <form>
          <div className="inqury">
            <div className="_wrap" max="820">
              <h4 className='tit'>문의하기</h4>

              <label htmlFor="">성함</label>
              <input type="text" name="name" placeholder='성함을 입력해주세요'/>

              <label htmlFor="">이메일</label>
              <input type="email" name="email" placeholder='이메일을 입력해주세요'/>

              <label htmlFor="">문의내용</label>
              <textarea name="content" placeholder='문의 내용을 입력해주세요'></textarea>
              
              <button type='submit'>문의</button>
            </div>
          </div>
        </form>


      </div>
      <Footer/>
    </>
  )
}

export default Main