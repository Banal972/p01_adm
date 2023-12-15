import React,{useState,useEffect} from 'react'
import {useNavigate, useParams} from "react-router-dom"
import {MdOutlineDelete} from "react-icons/md"
import {BiSolidWrench,BiSearch} from "react-icons/bi"
import {BsCheck} from "react-icons/bs"
import axios from 'axios';

// 컴포넌트
import Button from '../../compoent/Button'
import LayoutTable from '../../compoent/LayoutTable'
import { useSelector } from 'react-redux'

function List(props) {

  // paprams 가져오기
  const {table} = useParams();

  // props 가져오가
  const {seleter,select,search,head,check,order,action,api} = props;

  const data = useSelector(state=>state[api]);
  
  // console.log(data);

  // 셀렉버튼 데이터 가져오기
  const [selectData,setSelectData] = useState([]);

  // 네비게이터
  const navigate = useNavigate();

  //페이지 번호
  const [page,setpage] = useState(1); // 현재 페이지 번호
  const [offset,setOffset] = useState(0); // offset
  const [total,setTotal] = useState(0); // total

  //체크버튼
  const [checkItem,setCheckItem] = useState([]);

  const checkApi = {
    checkItem : checkItem,
    setCheckItem : setCheckItem
  }
  
  // 전체 데이터 가져오기
  useEffect(()=>{

    setCheckItem([]); // 체크박스 초기화
    // tableDataGet();

  },[api,table,page]);

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

  }

  return (
    <>
      <div className="layout top">
        { select && 
          <Select 
            select = {selectData}
            setSelectData = {setSelectData}
            seleter={seleter}
          /> 
        }
        {/* { search && <Search setDataSet={setDataSet} selectData={selectData} api={api}/> } */}
      </div>

      <div className="layout">

        <LayoutTable
            check={check}
            checkApi = {checkApi}
            order={order}
            action={action}
            head={head}
            api={api}
            dataset={data}
            page={page}
            setpage={setpage}
            offset={offset}
            total={total}
        />

        <div className="btn-list">

          <Button color={"color02"} onClick={selDel}>선택 삭제</Button>
          <Button onClick={()=>navigate('write')}>등록</Button>

        </div>

      </div>

    </>
  )
    
}

// 셀렉버튼
function Select({seleter,selectData,setSelectData}) {

  const onChange = (e)=>{
    setSelectData(e.target.value);
  }

  return (
    <select className="lay-select" onChange={onChange} value={selectData}>
        <option value="">전체</option>
        {
          seleter.map((e,i)=>(
            <option key={i} value={e.value}>{e.text}</option>
          ))
        }
    </select>
  )

}

// 검색버튼
/* function Search({selectData,setDataSet,api}) {

  // paprams 가져오기
  const {table} = useParams();

  const [search,setSearch] = useState('');

  const onInput = (e)=>{
    setSearch(e.target.value);
  }

  const onKeyUp = (e)=>{
    if(e.key === "Enter" || e.keyCode === 13){
      
      if(table){

        axios.get(api,{
          params : {
            table : table,
            select : selectData,
            search : search
          }
        })
        .then(res=>{
          const {data} = res;
          setDataSet(data);
        })
        .catch(err=>console.error(err));

      }else{

        axios.get(api,{
          params : {
            select : selectData,
            search : search
          }
        })
        .then(res=>{
          const {data} = res;
          setDataSet(data);
        })
        .catch(err=>console.error(err));

      }

    }
  }

  return (
    <label htmlFor="search" className="lay-search compo-lay">
        <div className="icon"><BiSearch/></div>
        <input id="search" type="text" value={search} placeholder='Search...' onInput={onInput} onKeyUp={onKeyUp}/>
    </label>
  )

} */



export default List