import React, { useEffect, useState } from 'react'
import {AiOutlineLeft,AiOutlineRight} from "react-icons/ai"
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

function Page({
    data,
    setChangeData
}) {

    const [searchParams, setSearchParams] = useSearchParams(); // 쿼리 스트링

    const [currentPage,setCurrentPage] = useState(1); // 현재 페이지

    useEffect(()=>{
        setCurrentPage(searchParams.get('page') || 1);
    },[searchParams]);

    // 네비게이터
    const navigate = useNavigate();

    const total = data.length; // 게시물 총 갯수
    const limit = 10; // 최대 게시물
    const totalPage = Math.ceil(total/limit); // 총 페이지

    // 페이징 출력
    const [paging, setPaging] = useState([]);

    // 현재 페이지 그룹의 첫번째 페이지
    const [first,setFirst] = useState(0);
    // 현재 페이지 그룹의 마지막 페이지
    const [last,setLast] = useState(0);

    // 이전 페이지
    const [prev,setPrev] = useState(0);
    // 다음 페이지
    const [next,setNext] = useState(0);

    useEffect(()=>{

        // 현재 페이지 그룹
        const pageGroup = Math.ceil(currentPage / 5);

        // 마지막 페이지
        let endPage = pageGroup * 5;
        if(endPage > totalPage) endPage = totalPage;
        setLast(endPage);

        // 시작 페이지
        const startPage = endPage - ( 5 - 1 ) <= 0 ? 1 : endPage - (5 - 1);
        setFirst(startPage);

        // 페이징 출력
        let pg = [];
        for (let i = startPage; i <= endPage; i++){
            pg.push(i);
        }
        setPaging(pg);

        // 이전페이지 세팅
        setPrev(startPage - 1);

        // 다음페이지 세팅
        setNext(endPage + 1);

        let copy = [...data];
        const sclie = copy.slice((currentPage - 1)*limit,limit*currentPage);
        setChangeData(sclie);

    },[currentPage]);

    return (
      <div className="paging">
  
          {
            prev > 0 &&
            <button 
                className='prev'
                // onClick={()=>firstPage - 1 }
            >
                <AiOutlineLeft/>
            </button>
          }

          {
            paging.map(e=>(
                <button 
                    className={ e == currentPage ? "act" : null} 
                    key={e}
                    onClick={()=>{
                        navigate(`?page=${e}`);
                    }}
                >
                    {e}
                </button>
            ))
          }
  
          {
            last < totalPage &&
            <button 
                className='next'
                // onClick={()=>lastPage + 1}
            >
                <AiOutlineRight/>
            </button>
          }
          
      </div>
    )

}

export default Page