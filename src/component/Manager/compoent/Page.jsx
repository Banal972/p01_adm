import React,{useEffect, useState} from 'react'
import {AiOutlineLeft,AiOutlineRight} from "react-icons/ai"
import { useParams } from 'react-router-dom';

function Page({page,totalPage,setpage}) {

    const pageMove = (e)=>{
        setpage(e);
    };

    const [startAmount,setStartAmount] = useState(0);
    const [endAmount,setEndAmount] = useState(0);

    const [count,setCount] = useState([]);

    useEffect(()=>{

        const pageGroup = Math.ceil(page / 5); // 현재 페이지 그룹
        const startAmount = ((pageGroup - 1) * 5) + 1 // 시작페이지
        let endAmount = pageGroup * 5; // 마지막 페이지

        if(endAmount >= totalPage){
            endAmount = totalPage;
        }

        let arr = [];

        if(totalPage > 1){
            for (let i = startAmount; i <= endAmount; i++ ){
                arr.push(i);
            }
        }

        setStartAmount(startAmount);
        setEndAmount(endAmount);
        setCount(arr);

        console.log(page,startAmount,endAmount);

    },[page]);

    


    return (
      <div className="paging">
  
          {
            startAmount > 1 &&
            <button className='prev' onClick={()=>{pageMove(startAmount-1)}}><AiOutlineLeft/></button>
          }
  
          {
              count.map((e,i)=>(
                  <button key={i} className={page === e ? "act" : ""} onClick={()=>pageMove(e)}>{e}</button>
              ))
          }
  
          {
            totalPage > endAmount &&
            <button className='next' onClick={()=>{pageMove(endAmount+1)}}><AiOutlineRight/></button>
          }
          
      </div>
    )

}

export default Page