import React, { useEffect, useState } from "react"
import {useNavigate, useParams} from "react-router-dom"

// 날짜관련 라이브러리
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";

import {BsDownload} from "react-icons/bs"
import {FiCalendar} from "react-icons/fi"

// 컴포넌트
import Button from "../../compoent/Button";

// 캘린더
import Calendar from "react-calendar";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { addAction, updatedAction } from "../../store/board";


function Write() {
  
  // 파라미터
  const {seq,table} = useParams();

  // 내비게이터
  const navigate = useNavigate();

  // 디스패치
  const dispath = useDispatch();

  // 로그인이 되어있으면 작성자 입력되어있음
  // 로그인한 유저
  const loginMember = useSelector(state=>state.loginMember);

  // 데이터
  const [inputData,setInputData] = useState({
    title : "",
    content : "",
    imgURL : "",
    writer : loginMember.nickName
  });

  const tableManager = useSelector(state=>state.tableManager);
  const boardManager = useSelector(state=>state.boardManager);

  useEffect(()=>{

    if(seq){
      const boardName = boardManager.filter(e=>e.board_table == table)[0];
      if(boardName){
        const getData = boardName.data.filter(e=>e.seq == seq)[0];
        setInputData((prev)=>({
          ...prev,
          title : getData.title,
          content : getData.content,
          imgURL : getData.imgURL,
          writer : getData.writer,
        }))
      }
    }

  },[seq,table]);

  const [imgOpen,setImgOpen] = useState(false);
  useEffect(()=>{
    const filter = tableManager.filter(e=>e.board_table == table);

    if(filter.length <= 0){
      alert('오류가 발생했습니다.');
      return navigate('/manager/board');
    }

    if(filter){
      if(filter[0].img == 'Y'){
        setImgOpen(true);
      }else{
        setImgOpen(false);
      }
    }
  },[table]);

  // 캘린더 출력
  const [dateOpen,setDateOpen] = useState(false);

  // input 데이터 수정
  const inputHandler = (value,type)=>{
    setInputData((prev)=>({
        ...prev,
        [type] : value
    }));
  }

  const updateHandler = ()=>{
    const pushData = {
        seq : seq,
        table : table,
        data : {...inputData}
    }
    if(window.confirm('수정 하시겠습니까?')){
        
        dispath(updatedAction(pushData));
        alert('수정이 완료되었습니다')
        return navigate(-1);

    }
  }

  const submitHandler = ()=>{

    if(inputData.title == ""){
        return alert('제목을 입력해주세요.');
    }

    if(inputData.writer == ""){
        return alert('작성자를 입력해주세요');
    }

    if(window.confirm('등록 하시겠습니까?')){

        const push = {
          table,
          data : {
            ...inputData
          }
        }

        dispath(addAction(push));
        alert('등록이 완료되었습니다');
        return navigate(-1);
    }
  }


  return (
    <div className="layout">

      <div className="input-box">
          <label htmlFor={"title"}>제목</label>
          <input 
              type="text" 
              id={"title"} 
              style={{maxWidth: 250}}
              value={inputData.title}
              onChange={(e)=>{inputHandler(e.target.value,"title")}} 
          />
      </div>

      <div className="input-textarea">
          <label htmlFor={"content"}>내용</label>
          <textarea 
              id="content" 
              placeholder="내용을 입력해주세요" 
              value={inputData.content}
              onChange={(e)=>{inputHandler(e.target.value,"content")}}
          />
      </div>

      {
        imgOpen ?
        <>
          <div className="input-file">
              <p>이미지</p>
              <label htmlFor="f">파일첨부 <BsDownload/></label>
              <input type="file" name="f" id="f" onChange={(e)=>{
                  e.preventDefault();
                  const fileURL = URL.createObjectURL(e.target.files[0]);
                  inputHandler(fileURL,"imgURL");
              }} />
          </div>
          { inputData.imgURL && <img src={inputData.imgURL} alt="" /> }
        </>
        : null
      }

      <div className="input-box">
          <label htmlFor={"writer"}>작성자</label>
          <input 
              type="text" 
              id={"writer"}
              style={{maxWidth: 250}}
              value={inputData.writer}
              onChange={(e)=>{inputHandler(e.target.value,"writer")}} 
          />
      </div>

      <div className="input-calender">
          <label htmlFor="date">작성 날짜</label>
          <div className="cal-box">
              <input 
                  type="text" 
                  id="date" 
                  value={moment(inputData.wtDate).format("YYYY-MM-DD")} 
                  readOnly 
                  onClick={()=>setDateOpen(true)}/>
              <FiCalendar/>
          </div>
          {
              dateOpen &&
              <Calendar
                  value={inputData.wtDate}
                  onChange={(e)=>{
                      const changeDate = moment(e).format('YYYY-MM-DD');
                      setInputData((prev)=>({
                          ...prev,
                          ["wtDate"] : changeDate
                      }))
                  }}
                  onClickDay={()=>{setDateOpen(false)}}
              />
          }
      </div>

      <div className="btn-list">

            <Button color={"color01"} onClick={()=>navigate(-1)}>취소</Button>
            {
                seq ?
                <Button onClick={updateHandler}>수정</Button>
                :
                <Button onClick={submitHandler}>등록</Button>
            }

        </div>

    </div>
  )

}

export default Write