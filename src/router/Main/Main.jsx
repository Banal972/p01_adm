import React, { useEffect, useRef, useState } from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import "./asset/scss/Main.scss";
import Footer from '../../component/Main/Layout/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// 디스패치
import { addAction } from '../../component/Manager/store/inqury';

function Main() {

  const navigate = useNavigate();

  // 유저 가져오기
  const member = useSelector(state=>state.member);
  const [memberData,setMemberData] = useState([]);

  useEffect(()=>{
    const splice = member.slice(0,10);
    setMemberData(splice);
  },[]);

  // 배너 가져오기
  const bannerManager = useSelector(state=>state.bannerManager);
  const [banner,setBanner] = useState([]);
  useEffect(()=>{

    const filter = bannerManager.filter(e=>e.main == "Y");
    setBanner(filter);

  },[bannerManager]);

  // 문의 게시글
  const inqury = useSelector(state=>state.inqury);
  const [inquryData,setInquryData] = useState([]);
  useEffect(()=>{
    const splice = inqury.slice(0,10);
    setInquryData(splice);
  },[inqury]);

  return (
    <>

      <div className="go_admin" onClick={()=>{
        navigate('/manager');
      }}>
        <p>관리자로 <br/>가기</p>
      </div>

      <div className="_main">

        <Swiper className='visual'>
          {
            banner.length > 0 ?
              banner.map((e,i)=>(
                <SwiperSlide key={i} style={{backgroundImage : `url(${e.imgURL})`}}>
                  <dl>
                    <dt>{e.title}</dt>
                    <dd>{e.content}</dd>
                  </dl>
                </SwiperSlide>
              ))
              :
              <SwiperSlide style={{backgroundColor : 'tomato'}}>
                <dl>
                  <dt>베너를 등록해주세요</dt>
                  <dd>베너를 등록해주세요1</dd>
                </dl>
              </SwiperSlide>
          }
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
                      inquryData.map((e,i)=>(
                        <li key={i}>
                          <Link to={'/'}>
                            <h4>{e.writer}</h4>
                            <p className='content'>{e.content}</p>
                            <p className='date'>{e.wDate}</p>
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

        <InquryForm/>

      </div>
      <Footer/>
    </>
  )
}


function InquryForm(){

  // 디스패치
  const dispatch = useDispatch();

  // ref
  const writer = useRef(null);
  const email = useRef(null);
  const content = useRef(null);

  // 데이터
  const [data,setData] = useState({
    writer : "",
    email : "",
    content : ""
  })

  // 인풋
  const inputHandler = (value,type)=>{
    setData((prev)=>({
      ...prev,
      [type] : value
    }))
  }

  // 문의하기
  const submitHandler = (e)=>{
    e.preventDefault();

    if(data.writer == ""){
      writer.current.focus();
      return alert('성함을 입력해주세요');
    }

    if(data.email == ""){
      email.current.focus();
      return alert('이메일을 입력해주세요');
    }

    if(data.content == ""){
      content.current.focus();
      return alert('문의내용을 입력해주세요');
    }

    if(window.confirm('문의 하시겠습니까?')){
      dispatch(addAction(data));
      setData({
        writer : "",
        email : "",
        content : ""
      })
      return alert('문의가 완료되었습니다');
    }

  }
  
  return (
    <form onSubmit={submitHandler}>
      <div className="inqury">
        <div className="_wrap" max="820">
          <h4 className='tit'>문의하기</h4>

          <label htmlFor="writer">성함</label>
          <input 
            type="text" 
            name="writer" 
            id='writer'
            ref={writer}
            placeholder='성함을 입력해주세요'
            value={data.writer}
            onChange={(e)=>inputHandler(e.target.value,'writer')}
          />

          <label htmlFor="email">이메일</label>
          <input 
            type="email" 
            name="email" 
            id='email' 
            ref={email}
            placeholder='이메일을 입력해주세요'
            value={data.email}
            onChange={(e)=>inputHandler(e.target.value,'email')}
          />

          <label htmlFor="content">문의내용</label>
          <textarea 
            name="content" 
            id='content' 
            ref={content}
            placeholder='문의 내용을 입력해주세요'
            value={data.content}
            onChange={(e)=>inputHandler(e.target.value,'content')}
          />
          
          <button type='submit'>문의</button>
        </div>
      </div>
    </form>
  )

}

export default Main