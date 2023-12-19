import {useState,useEffect} from "react"
import {useNavigate, useParams} from "react-router-dom"
import {BsCheck} from "react-icons/bs"

// 리덕스
import { useDispatch, useSelector } from "react-redux";

// 테이블
import { addAction, updatedAction } from "../../store/table";

// 날짜
import moment from "moment";

// 컴포넌트
import Button from "../../compoent/Button";
import { addBoard } from "../../store/board";

function Write() {
  
    // 파라미터
    let { seq } = useParams();

    // 내비게이터
    const navigate = useNavigate();

    // 로그인한 유저
    const loginMember = useSelector(state=>state.loginMember);

    // 테이블 데이터
    const tableManager = useSelector(state=>state.tableManager);

    // 디스패치
    const dispatch = useDispatch();

    // 셀럭트
    const [select,setSelect] = useState("normal");

    // 데이터
    const [inputData,setInputData] = useState({
        board_name : "",
        board_table : "",
        writer : loginMember.nickName,
        main : "N",
        img : "N",
        wData : moment(new Date()).format('YYYY-MM-DD')
    });

    // 파라미터가 있을경우 데이터 추가
    useEffect(() => {
        
        if(seq){

            const filter = tableManager.filter(e=>e.seq == seq)[0];

            setInputData((prev)=>(
                {
                    ...prev,
                    board_name : filter.board_name,
                    board_table : filter.board_table,
                    writer : filter.writer,
                    main : filter.main,
                    img : filter.img,
                    wData : filter.wData
                }
            ));

            if(filter.img === "Y"){
                setSelect("gallery");
            }

        }

    }, [seq]);

    // 데이터수정
    const inputHandler = (e,action)=>{
        let input = {};
        input[action] = e.target.value;
        setInputData(prev=>({
            ...prev,
            ...input
        }));
    }

    // 메인 체크
    const checkHandler = (e)=>{

        let check = "N";

        if(e.target.checked){
            check = "Y";
        }else{
            check = "N";
        }

        setInputData(prev=>({
            ...prev,
            main : check
        }));

    }

    // 테마변경
    const themeHandler = (e)=>{
        switch(e.target.value){
            case "gallery" :
                setInputData(prev=>({
                    ...prev,
                    img : 'Y'
                }));
            break;
            case "normal" :
                setInputData(prev=>({
                    ...prev,
                    img : 'N'
                }));
            break;
        }
    }

    
    // 수정
    const updateHandler = ()=>{

        if(window.confirm('수정 하시겠습니까?')){

            const push = {
                seq,
                ...inputData
            }

            dispatch(updatedAction(push));
            return navigate(-1);

        }

    }


    // 등록
    const submitHandler = ()=>{

        const filter = tableManager.filter(e=>e.board_table == inputData.board_table)

        if(filter.length > 0){
            setInputData((prev)=>(
                {
                    ...prev,
                    board_table : ""
                }
            ))
           return alert('이미 등록되어있는 테이블 이름 입니다.')
        }

        if(window.confirm('등록 하시겠습니까?')){

            try {
                dispatch(addAction(inputData));
                dispatch(addBoard(inputData.board_table));
                return navigate(-1);
            }
            catch(e){
                alert('에러가 발생했습니다');
            }

        }

    }

    return (
        <div className="layout">

            <label htmlFor="dash" className='table-check' style={{marginBottom : 25}}>
                <input 
                    type="checkbox" 
                    id="dash" 
                    value={inputData.main} 
                    checked={inputData.main === 'Y' ? true : false}
                    readOnly
                    onClick={checkHandler} 
                />
                <div><BsCheck/></div> 대시보드 메인 등록
            </label>

            <div className="input-box">
                <label htmlFor="bn">게시판 이름</label>
                <input type="text" name="bn" id="bn" 
                    value={inputData.board_name} 
                    onInput={e=>inputHandler(e,"board_name")}
                />
            </div>

            <div className="input-box">
                <label htmlFor="bt"> 테이블 이름 <span>* (영어만 입력 가능합니다.)</span> </label>
                <input type="text" name="bt" id="bt" 
                    value={inputData.board_table} 
                    onInput={e=>inputHandler(e,"board_table")}
                    disabled={seq ? true : false}
                />
            </div>

            <div className="input-select">
                <label htmlFor="theme">테마</label><br/>
                <select id="theme" 
                    onChange={e=>themeHandler(e)}
                    key={select}
                    defaultValue={select}
                >
                {
                    [{name : '일반 게시판', value : "normal"},{name : '갤러리 게시판', value : "gallery"}].map((key,i)=>(
                        <option 
                            key={i} 
                            value={key.value}
                        >{key.name}</option>
                    ))
                }
                </select>
            </div>

            <div className="input-box">
                <label htmlFor="wt" >작성자</label>
                <input type="text" name="wt" id="wt" 
                    value={inputData.writer}
                    onInput={e=>inputHandler(e,"writer")}
                />
            </div>

            <div className="btn-list">

                <Button color={"color01"} onClick={(e)=>navigate(-1)}>취소</Button>
                {
                    seq ?
                    <Button color={"color02"} onClick={updateHandler}>수정</Button>
                    :
                    <Button onClick={submitHandler}>등록</Button>
                }

            </div>

        </div>
    )

}

export default Write