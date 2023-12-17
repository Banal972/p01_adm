import React, { useEffect, useState } from "react"
import {useNavigate, useParams} from "react-router-dom"

// 날짜관련 라이브러리
import moment from "moment";

// 컴포넌트
import Button from "../../compoent/Button";
import { useDispatch, useSelector } from "react-redux";
import { updatedAction } from "../../store/inqury";

// 아이콘
import {FiCalendar} from "react-icons/fi"


function Write() {
  
  // 파라미터
  const {seq} = useParams();

  // 내비게이터
  const navigate = useNavigate();

  // 디스패치
  const dispath = useDispatch();

  // 서버에 보낼 데이터
  const [inputData,setInputData] = useState({
    email : "",
    content : "",
    writer : "",
    wDate : "",
  });

  const inqury = useSelector(state=>state.inqury);
  useEffect(()=>{

      if(seq){

          const filter = inqury.filter(e=>e.seq == seq)[0];

          if(filter == undefined){
              alert('오류가 발생했습니다');
              return navigate(-1);
          }

          setInputData({
            email : filter.email,
            content : filter.content,
            writer : filter.writer,
            wDate : filter.wDate,
          });
      }

  },[seq]);

  // input 데이터 수정
  const inputHandler = (value,type)=>{
    setInputData((prev)=>({
        ...prev,
        [type] : value
    }));
  }

  const updateHandler = ()=>{
    const pushData = {
        seq : Number(seq),
        ...inputData
    }
    if(window.confirm('수정 하시겠습니까?')){
        
        dispath(updatedAction(pushData));
        alert('수정이 완료되었습니다')
        return navigate(-1);

    }

  }

  return (
    <div className="layout">

        <div className="input-box">
          <label htmlFor="email">이메일</label>
          <input type="text" name="email" id="email"
              value={inputData.email} 
              onInput={e=>inputHandler(e.target.value,"email")}
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

        <div className="input-box">
          <label htmlFor="writer">작성자</label>
          <input 
              type="text" 
              name="writer" 
              id="writer"
              value={inputData.writer} 
              onInput={e=>inputHandler(e,"writer")}
              disabled
          />
        </div>

        <div className="input-calender">
            <label htmlFor="date">작성 날짜</label>
            <div className="cal-box">
                <input 
                    type="text" 
                    id="date" 
                    value={moment(inputData.wDate).format("YYYY-MM-DD")} 
                    readOnly
                    disabled
                  />
                <FiCalendar/>
            </div>
        </div>

        <div className="btn-list">
            <Button color={"color01"} onClick={()=>navigate(-1)}>취소</Button>
            <Button onClick={updateHandler}>수정</Button>
        </div>

    </div>
  )

}

export default Write