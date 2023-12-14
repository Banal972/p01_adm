import {useState,useEffect} from "react"
import {useNavigate, useParams} from "react-router-dom"
import axios from "axios";

// 컴포넌트
import Button from "../../compoent/Button";

function Write() {
  
    // 파라미터
  let { id } = useParams();

  // 내비게이터
  const navigate = useNavigate();

  const [data,setData] = useState({
    id : "",
    nickName : "",
    pw : "",
    role : 1,
  });

  const [pwCheck,setPwCheck] = useState("");

  useEffect(() => {
    
    if(id){
        axios.get('/api/user/getid',{
            params: {
                id : id
            }
        })
        .then(res=>{
            const {data} = res;
    
            setData({
                id : data.userID,
                nickName : data.nickName,
                pw : "",
                role : data.rank
            });
    
        })
        .catch(err=>console.error(err));
    }

  }, [id]);

  return (
    <div className="layout">

      <div className="input-box">
        <label htmlFor="userId">아이디</label>
        
        <input type="text" name="userId" id="userId" value={data.id} onChange={(e)=>{
          
          setData((prev)=>({
            ...prev,
            id : e.target.value
          }));

        }} />

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
              role : parseInt(e.target.value)
            }));
          }} 
          value={data.role}
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
            <Button onClick={()=>{
            
                if(window.confirm('수정 하시겠습니까?')){
    
                  if( data.pw !== pwCheck){
                    return alert('비밀번호가 서로 다릅니다.');
                  }
                  
                }
    
              }}>수정</Button>
            :
            <Button onClick={()=>{
            
                if(window.confirm('등록 하시겠습니까?')){
    
                  if( data.pw !== pwCheck){
                    return alert('비밀번호가 서로 다릅니다.');
                  }
    
                  axios.post('/api/user/sign',{
                    userID : data.id,
                    userPW : data.pw,
                    nickName : data.nickName,
                    rank : data.role
                  })
                  .then(res=>{
    
                    const {data} = res;
    
                    if(data.suc === true){
                      alert('회원가입 되었습니다.');
                      navigate(-1);
                    }else if(data.suc === "idNot"){
                      alert('이미 있는 아이디 입니다.');
                    }
                    
                  })
                  .catch(err=>{
                    console.error(err);
                  });
    
                }
    
              }}>등록</Button>
          }

      </div>

    </div>
  )

}

export default Write