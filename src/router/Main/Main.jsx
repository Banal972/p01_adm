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


  // 배너 가져오기
  const bannerManager = useSelector(state=>state.bannerManager);
  const [banner,setBanner] = useState([]);
  useEffect(()=>{

    const filter = bannerManager.filter(e=>e.main == "Y");
    setBanner(filter);

  },[bannerManager]);

  // 등록한 게시판 2개 가져오기
  const tableManager = useSelector(state=>state.tableManager);
  const boardManager = useSelector(state=>state.boardManager);
  const [boardSlice,setBoardSlice] = useState([]);
  useEffect(()=>{

    //게시판 2개 자르기
    const slice = boardManager.slice(0,2);

    //테이블매니저랑 비교해서 이름 가져오기
    const getName = tableManager.filter((e,i)=>{
      return e.board_table == slice[i]?.board_table;
    });

    // 2개 조합
    const newObject = [];
    getName.forEach((e,i)=>{
      
      const name = e.board_name;

      const slc = slice[i].data.slice(0,5);

      newObject.push({
        name,
        data : slc
      })

    });

    //게시판 출력
    setBoardSlice(newObject);

  },[tableManager,boardManager]);
  

  // 유저 가져오기
  const member = useSelector(state=>state.member);
  const [memberData,setMemberData] = useState([]);
  useEffect(()=>{
    const filter = member.filter(e=>e.rank < 10);
    const splice = filter.slice(0,5);
    setMemberData(splice);
  },[member]);

  // 문의 게시글
  const inqury = useSelector(state=>state.inqury);
  const [inquryData,setInquryData] = useState([]);
  useEffect(()=>{
    const splice = inqury.slice(0,5);
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

                {
                  boardSlice.length > 0 ?
                    boardSlice.map((e,i)=>(
                      <div className={i == 0 ? "lbx" : "rbx"} key={i}>
                        <div className="name">{e.name}</div>
                        <ul>
                          {
                            e.data.map((a,i)=>(
                              <li key={i}>
                                <h4>{a.title}</h4>
                                <p className='content'>{a.content}</p>
                                <p className='date'>{a.wDate}</p>
                              </li>
                            ))
                          }
                        </ul>
                      </div>
                    ))
                    :
                    <p style={{textAlign : 'center', flex : 1}}>등록된 게시판이 없습니다.</p>
                }
                
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
                      memberData.length > 0 ?
                        memberData.map((e,i)=>(
                          <li key={i}>
                            <h4>{e.userID}</h4>
                            <p className='date'>{e.wtDate}</p>
                          </li>
                        ))
                      :
                      <li>데이터가 존재하지 않습니다</li>
                    }
                  </ul>
                </div>

                <div className='rbx'>
                  <div className="name">온라인 문의</div>
                  <ul>
                    {
                      inquryData.length > 0 ?
                      inquryData.map((e,i)=>(
                        <li key={i}>
                          <h4>{e.writer}</h4>
                          <p className='content'>{e.content}</p>
                          <p className='date'>{e.wDate}</p>
                        </li>
                      ))
                      :
                      <li>데이터가 존재하지 않습니다.</li>
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

