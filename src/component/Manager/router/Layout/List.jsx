import React,{useState,useEffect} from 'react'
import {useNavigate, useParams} from "react-router-dom"
import {MdOutlineDelete} from "react-icons/md"
import {BiSolidWrench,BiSearch} from "react-icons/bi"
import {BsCheck} from "react-icons/bs"
import { useSelector } from 'react-redux'

// 컴포넌트
import Button from '../../compoent/Button'
import LayoutTable from '../../compoent/LayoutTable'
import Page from '../../compoent/Page'

function List(props) {

  // 네비게이터
  const navigate = useNavigate();

  // paprams 가져오기
  const {table} = useParams();

  // props 가져오가
  const {seleter,head,check,order,action,api} = props;

  // 게시물 데이터
  const data = useSelector(state=>state[api]); // 원본
  const [changeData,setChangeData] = useState(data); // 수정데이터

  // 셀렉버튼 데이터 가져오기
  const [selectData,setSelectData] = useState([]);

  //페이지 번호
  const [page,setpage] = useState(1); // 현재 페이지 번호
  const [offset,setOffset] = useState(0); // offset
  const [total,setTotal] = useState(0); // total

/*   //체크버튼
  const [checkItem,setCheckItem] = useState([]);

  const checkApi = {
    checkItem : checkItem,
    setCheckItem : setCheckItem
  }
  
  // 전체 데이터 가져오기
  useEffect(()=>{

    setCheckItem([]); // 체크박스 초기화

  },[table,page]);

  //선택 삭제

  const selDel = ()=>{

    if(window.confirm('삭제하시겠습니까?')){

      axios.delete(`${api}/seldel`,{
        params : {
          seq : checkItem,
          table : table
        }
      })
      .then(res=>{
        const {data} = res;
        if(data.suc){
          alert(data.msg);
          setCheckItem([]); // 초기화
          // tableDataGet(); // 다시 데이터 불러오기
        }else{
          alert(data.msg);
        }
      })
      .catch(err=>{
        alert('오류가 발생했습니다.')
        console.error(err);
      });
    
    }

  } */

  return (
    <>
      <div className="layout top">
        { seleter && 
          <Select 
            seleter={seleter} // 셀렉버튼 데이터
            data={data} // 원본 데이터
            setChangeData={setChangeData} // 데이터 수정 함수
          /> 
        }
      </div>

      <div className="layout">

        <LayoutTable
            // check={check}
            // checkApi = {checkApi}
            data={changeData} // 데이터
            setChangeData={setChangeData} // 데이터 수정 함수
            order={order}
            action={action} // 수정 / 삭제
            head={head} // 테이블 헤더
            api={api}
            page={page}
            setpage={setpage}
            offset={offset}
            total={total}
        />

        <div className="btn-list">
          {/* <Button color={"color02"} onClick={selDel}>선택 삭제</Button> */}
          <Button onClick={()=>navigate('write')}>등록</Button>
        </div>

      </div>

    </>
  )
    
}

// 검색버튼
function Select({
  seleter, // 검색 셀렉박스 데이터
  data, // 원본 데이터
  setChangeData // 수정 데이터 함수
}) {

  // paprams 가져오기
  const {table} = useParams();

  const [input,setInput] = useState('');
  const [select,setSelect] = useState('');

  // 검색어
  const onInput = (e)=>{
    setInput(e.target.value);
  }

  // 셀렉버튼 이벤트
  const onChange = (e)=>{
    setSelect(e.target.value);
  }

  // 검색
  const onKeyUp = (e)=>{
    if(e.key === "Enter" || e.keyCode === 13){
      
      let filter = [...data];

      filter = data.filter(e=>{

        if(select == ""){
          console.log(e['userID'].includes(input));
          console.log(e['nickName'].includes(input));
          return e['userID'].includes(input) || e['nickName'].includes(input);
        }else{
          if(typeof e[select] == "string"){
            return e[select].includes(input);
          }
        }

      });

      setChangeData(filter);

    }
  }

  return (
    <>
      <select 
        className="lay-select"
        onChange={onChange}
      >
        <option value="">전체</option>
        {
          seleter.map((e,i)=>(
            <option key={i} value={e.value}>{e.text}</option>
          ))
        }
    </select>
      <label htmlFor="search" className="lay-search compo-lay">
        <div className="icon"><BiSearch/></div>
        <input 
          id="search" 
          type="text" 
          value={input} 
          placeholder='Search...' 
          onInput={onInput} 
          onKeyUp={onKeyUp}
        />
    </label>
    </>
  )

}





export default List