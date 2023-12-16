import React, { useEffect, useState } from "react"
import {useNavigate, useParams} from "react-router-dom"
import axios from "axios";

// 컴포넌트
import Button from "../../compoent/Button";
import InputBox from "../../compoent/Input/InputBox";
import InputTextarea from "../../compoent/Input/InputTextarea";
import InputFile from "../../compoent/Input/InputFile";
import InputCalender from "../../compoent/Input/InputCalender";

function Write() {
  
  // 내비게이터
  const navigate = useNavigate();

  // 데이터
  const [inputData,setInputData] = useState({
    title : "",
    content : "",
    imgURL : "",
    writer : ""
  });


  useEffect(()=>{
    setInputData((prev)=>({
        ...prev,
        writer : ""
      }))
  },[])


  return (
    <div className="layout">

        <InputBox
            title={"제목"}
            name={"title"}
            value={ inputData.title }
            onUpdate={setInputData}
        />

        <InputTextarea/>

        <InputFile/>

        <InputBox
            title={"작성자"}
            name={"write"}
            width={250}
            value={ inputData.writer }
            onUpdate={setInputData}
        />

        <InputCalender/>

        <div className="btn-list">

            <Button color={"color01"}>취소</Button>
            <Button>수정</Button>
            <Button>등록</Button>

        </div>

    </div>
  )

}







export default Write