import React, { useEffect, useState } from "react"
import {useNavigate, useParams} from "react-router-dom"

// 날짜관련 라이브러리
import moment from "moment";

// 리덕스
import { useDispatch, useSelector } from "react-redux";

// 아이콘
import {BsDownload} from "react-icons/bs"
import {FiCalendar} from "react-icons/fi"
import {BsCheck} from "react-icons/bs"

// 컴포넌트
import Button from "../../compoent/Button";

// 캘린더
import Calendar from "react-calendar";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { addAction, updatedAction } from "../../store/banner";


function Write() {

    // 파라미터
    const {seq} = useParams();
  
    // 내비게이터
    const navigate = useNavigate();

    // 디스패치
    const dispath = useDispatch();

    // 서버에 보낼 데이터
    const [inputData,setInputData] = useState({
        title : "",
        content : "",
        imgURL : "",
        writer : "",
        main : "N",
        wtDate : new Date(),
    });

    // 캘린더 출력
    const [dateOpen,setDateOpen] = useState(false);

    // 파라미터가 없으면 로그인 되어있는 작성자 가져오기
    const loginMember = useSelector(state=>state.loginMember);

    useEffect(()=>{

        if(!seq){
            setInputData((prev)=>({
                ...prev,
                writer : loginMember.nickName
            }));
        }

    },[loginMember]);

    // 파라미터가 있으면 데이터 넣기

    const bannerManager = useSelector(state=>state.bannerManager);
    useEffect(()=>{

        if(seq){

            const filter = bannerManager.filter(e=>e.seq == seq)[0];

            if(filter == undefined){
                alert('오류가 발생했습니다');
                return navigate(-1);
            }

            setInputData({
                title : filter.title,
                content : filter.content,
                imgURL : filter.imgURL,
                main : filter.main,
                writer : filter.writer,
                wtDate : filter.wtDate,
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

    const submitHandler = ()=>{

        if(inputData.title == ""){
            return alert('제목을 입력해주세요.');
        }

        if(inputData.imgURL == ""){
            return alert('이미지를 업로드 해주세요');
        }

        if(inputData.writer == ""){
            return alert('작성자를 입력해주세요');
        }

        if(window.confirm('등록 하시겠습니까?')){
            dispath(addAction(inputData));
            alert('등록이 완료되었습니다');
            navigate(-1);
        }
    }

  return (
    <div className="layout">

        <label htmlFor="main" className='table-check' style={{marginBottom : 25}}>
            <input 
                type="checkbox" 
                id="main"
                checked={inputData.main === 'Y' ? true : false} 
                readOnly
                onClick={(e)=>{
                    if(e.target.checked){
                        inputHandler('Y','main');
                    }else{
                        inputHandler('N','main');
                    }
                }}
            />
            <div><BsCheck/></div> 메인 등록
        </label>

        <div className="input-box">
            <label htmlFor={"title"}>제목</label>
            <input 
                type="text" 
                id={"title"} 
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

            <Button color={"color01"}>취소</Button>
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