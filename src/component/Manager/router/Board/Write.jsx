import {useState,useEffect} from "react"
import {useNavigate, useParams} from "react-router-dom"
import axios from "axios";
import {BsCheck} from "react-icons/bs"

// 컴포넌트
import Button from "../../compoent/Button";
import { useDispatch, useSelector } from "react-redux";
import { addAction } from "../../store/table";

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
        img : "N"
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
                    img : filter.img
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
        }
    }

    // 등록버튼
    const createHandler = ()=>{

        if(seq){

            if(window.confirm('수정 하시겠습니까?')){

                // dispatch(addAction())

                /* axios.put('/api/board/create',inputData)
                .then(({data})=>{
                    if(data.suc){
                        alert(data.msg);
                        navigate('/manager/board');
                    }else{
                        alert(data.msg);
                    }
                })
                .catch(err=>console.log(err)); */

            }

        }else {

            if(window.confirm('등록 하시겠습니까?')){

                dispatch(addAction(inputData));
                navigate('/manager/board');

            }

        }
        
    }

    return (
        <div className="layout">

            <label htmlFor="dash" className='table-check' style={{marginBottom : 25}}>
                <input type="checkbox" id="dash" value={inputData.main} defaultChecked={inputData.main === 'Y' ? true : false} onClick={checkHandler} />
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
                    <Button color={"color02"} onClick={createHandler}>수정</Button>
                    :
                    <Button onClick={createHandler}>등록</Button>
                }

            </div>

        </div>
    )

}

export default Write