import React, { useEffect, useState } from 'react'
import { BsCheck } from 'react-icons/bs'
import { BiSolidWrench } from 'react-icons/bi'
import { MdOutlineDelete } from 'react-icons/md'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Page from "./Page"
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { delAction } from '../store/menu'

function LayoutTable({
  head,check,order,dataset,action,api,update,setpage,page,offset,total,checkApi
}){

    // 내비게이터
    const navigate = useNavigate();

    // 디스패치
    const dispatch = useDispatch();

    // colums
    const gridColumns = `${check ? "75px": ""} ${order ? "120px": ""} repeat(${head.length},1fr) ${action ? "150px" : ""}`;

    // 테이블 헤더
    const headKey = head.map((key)=>key.value);


    const singleCheckHandler = (checked,seq)=>{

      if(checked){
        checkApi.setCheckItem(prev=>[...prev,seq]);
      }else{
        checkApi.setCheckItem(checkApi.checkItem.filter(el=> el !== el.seq));
      }

    }

    const allCheckHandler = (checked)=>{

      if(checked){
        
        const idArr = [];
        dataset.forEach(el=> idArr.push(el.seq));
        checkApi.setCheckItem(idArr);

      }else{
        checkApi.setCheckItem([]);
      }

    }

    //업데이트 버튼
    const upDateClick = (e,id)=>{
      e.preventDefault(); 
      navigate(`write/${id}`);
    }

    // 삭제 버튼
    const deleteClick = (e,id)=>{

      e.preventDefault();

      if(window.confirm('삭제하시겠습니까?')){

        axios.delete(`${api}/del`,{
          params : {
            seq : id
          }
        })
        .then(res=>{
          const {data} = res;
          if(data.suc){
            alert(data.msg);
            update(); // 다시 데이터 불러오기

            if(api === "/api/board"){
              dispatch(delAction(dataset.board_table))
            }

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
          <div className="table-grid">
    
            <div className="col" style={{gridTemplateColumns:gridColumns}}>
    
              {
                check &&
                <label htmlFor="allchk" className='table-check'>
                  <input 
                    type="checkbox" 
                    name="allchk" 
                    id="allchk" 
                    onChange={(event)=>allCheckHandler(event.target.checked)} 
                    defaultChecked={checkApi.checkItem.length > 0 ? dataset.length === checkApi.checkItem.length ? true : false : false}
                  />
                  <div><BsCheck/></div>
                </label>
              }
    
              {
                order &&
                <p>번호</p>
              }
              
              {
                head.map((e,i)=>(
                  <p key={i}>{e.text}</p>
                ))
              }
    
              {
                action &&
                <p>Action</p>
              }
    
            </div>
    
            <>
              {
                dataset?.length > 0 ?  

                dataset.map((e,i)=>(
                    <div key={i} className="col" style={{ 
                      gridTemplateColumns: dataset ? gridColumns : "1fr"
                    }}>
    
                      {
                        check 
                        &&
                        <label htmlFor={`chk${i}`} className='table-check'>
                          <input 
                            type="checkbox" 
                            name={`chk${i}`}
                            id={`chk${i}`} 
                            onChange={(event)=>{singleCheckHandler(event.target.checked,e.seq)}} 
                            checked={checkApi.checkItem.includes(e.seq) ? true : false}
                          />
                          <div><BsCheck/></div>
                        </label>
                      }
    
                      {
                        order && <p>{offset+(i+1)}</p>
                      }
    
                      {
                        headKey.map((keys,i)=>{
    
                          // 유저 리스트
                          if(keys == "rank"){
                            
                            return <Role api={api} key={i} e={e}/>
    
                          }else if(keys == "userID"){
                            
                            return <Link to={`view/${e.seq}`} key={i}>{e[String(keys)]}</Link>

                          }
                          // 게시판 관리 리스트
                          else if(keys == "theme"){
    
                            return <Theme key={i} e={e}/>
    
                          }else if(keys == "board_table"){
                            
                            return <Link to={`view/${e.seq}`} key={i}>{e[String(keys)]}</Link>

                          }
                          // 일반 게시판 리스트
                          else if(keys == "title"){
                            
                            return <Link to={`view/${e.seq}`} key={i}>{e[String(keys)]}</Link>

                          }
                          // 그외
                          else {

                            return <p key={i}>{e[String(keys)]}</p>

                          }
    
                        })
                      }
                      
                      {
                        action 
                        &&
                        <div className='table-action'>
                          <button className='update' onClick={(ei)=>upDateClick(ei,e.seq)}><BiSolidWrench/></button>
                          <button className='delete' onClick={(ei)=>deleteClick(ei,e.seq)}><MdOutlineDelete/></button>
                        </div>
                      }
    
                    </div>
                  ))
                : 
                <div className="col">
                  "테이터가 존재하지 않습니다."
                </div>
              }
            </>
    
          </div>
    
          <Page
            totalPage = {total}
            page = {page}
            setpage = {setpage}
            api={api}
          />
    
        </>
    
    )


    // 테마 수정
    function Theme({e}){

        return (

            <select defaultValue={e.table_name} className='table-select'>
            {
                ['일반 게시판','갤러리 게시판'].map((s)=>(
                <option key={s} value={s}>{s}</option>
                ))
            }
            </select>

        )

    }


    // 권한 수정
    function Role({api,e}){
    
        return (
                
            <select defaultValue={e.rank} className='table-select' onChange={(ei)=>{
        
                ei.preventDefault();
        
                if(window.confirm('권한을 수정하겠습니까?')){
                  
                    axios.put(`${api}/role`,{
                      seq : e.seq,
                      role : ei.target.value
                    })
                    .then(res=>{
                      const {data} = res;

                      if(data.suc === true){
                        alert('수정이 완료 되었습니다.');
                      }else{
                        ei.target.value = e.rank;
                        alert('수정을 실패하였습니다.');
                      }

                    })
                    .catch(err=>console.error(err));

                }else{

                  ei.target.value = e.rank;

                }
        
            }}>
        
            {
                
                [1,2,3,4,5,6,7,8,9,10].map((s)=>(
                <option key={s} value={s}>{s}</option>
                ))
                
            }
        
            </select>
    
        )
    
    }


}

export default LayoutTable