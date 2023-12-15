import {useState,useEffect} from "react"
import {useNavigate, useParams} from "react-router-dom"
import axios from "axios";

// 컴포넌트
import Button from "../../compoent/Button";
import { useDispatch, useSelector } from "react-redux";
import { addAction, updateAction } from "../../store/memeber";

function Write() {
  
  // 파라미터
  let { id } = useParams();

  // 디스패치
  const dispath = useDispatch();

  // 멤버데이터
  const member = useSelector(state =>state.member);

  // 내비게이터
  const navigate = useNavigate();

  const [data,setData] = useState({
    id : "",
    nickName : "",
    pw : "",
    rank : 1,
  });

  const [pwCheck,setPwCheck] = useState("");

  // id 존재하면 데이터 가져오기
  useEffect(() => {
    
    if(id){
        const filter = member.filter(e=> e.seq == id)[0];

        setData({
          id : filter.userID,
          nickName : filter.nickName,
          pw : "",
          rank : filter.rank
        });

    }

  }, [id]);


  // 등록
  const onSumbit = ()=>{
    if(window.confirm('등록 하시겠습니까?')){
    
      if( data.pw !== pwCheck){
        return alert('비밀번호가 서로 다릅니다.');
      }

      const idchk = member.filter(e=>e.userID == data.id)[0];
      if(!idchk){

        dispath(addAction(data));
        alert('회원가입 되었습니다.');
        navigate(-1);

      }else{
        
        setData((prev)=>(
          {
            ...prev,
            id : "",
          }
        ));

        alert('이미 존재하는 아이디 입니다');
      }

    }
  }

  // 수정
  const onUpdate = ()=>{
    if(window.confirm('수정 하시겠습니까?')){
    
      if( data.pw !== pwCheck){
        return alert('비밀번호가 서로 다릅니다.');
      }

      const payload = {
        seq : id,
        ...data
      }

      dispath(updateAction(payload));
      alert('수정이 완료 되었습니다.');
      navigate(-1);
      
    }
  }

  return (
    <div className="layout">

      <div className="input-box">
        <label htmlFor="userId">아이디</label>
        
        <input 
          type="text" 
          name="userId" 
          id="userId" 
          value={data.id} 
          onChange={(e)=>{
          
              setData((prev)=>({
                ...prev,
                id : e.target.value
              }));

            }
          }
          disabled={id}
        />

      </div>

      <div className="input-box">

        <label htmlFor="nickName">닉네임</label>

        <input type="text" name="nickName" id="nickName" value={data.nickName} onChange={(e)=>{
          
          setData((prev)=>({
            ...prev,
            nickName : e.target.value
          }));

        }} />

      </div>

      <div className="input-box">
        <label htmlFor="pwd">비밀번호</label>

        <input type="password" name="pwd" id="pwd" value={data.pw} onChange={(e)=>{

          setData((prev)=>({
            ...prev,
            pw : e.target.value
          }));

        }} />

      </div>

      <div className="input-box">
        <label htmlFor="chkpwd">비밀번호 체크</label>

        <input type="password" name="chkpwd" id="chkpwd" value={pwCheck} onChange={(e)=>{
          setPwCheck(e.target.value);
        }} />

      </div>

      <div className="input-select">
        <label htmlFor="sel">회원등급</label><br/>
        <select id="sel" onChange={(e)=>{
            setData(prev=>({
              ...prev,
              rank : parseInt(e.target.value)
            }));
          }} 
          value={data.rank}
        >
          {
            [1,2,3,4,5,6,7,8,9,10].map((key)=>(
              <option key={key} value={key}>{key}</option>
            ))
          }
        </select>
      </div>

      <div className="btn-list">

          <Button color={"color01"} onClick={(e)=>navigate(-1)}>취소</Button>
          {
            id ?
            <Button onClick={onUpdate}>수정</Button>
            :
            <Button onClick={onSumbit}>등록</Button>
          }

      </div>

    </div>
  )

}

export default Write