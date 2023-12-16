import React, { useEffect, useState } from 'react'
import Button from '../../compoent/Button'
import {AiOutlineLeft,AiOutlineRight} from "react-icons/ai"
import {BsCheck} from "react-icons/bs"
import {MdOutlineDelete} from "react-icons/md"
import {BiSolidWrench,BiSearch} from "react-icons/bi"
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAction, updateRank } from '../../store/memeber'

export default function List() {

    // 쿼리 스트링
    const [searchParams, setSearchParams] = useSearchParams();

    // 네비게이터
    const navigate = useNavigate();

    // 디스패치
    const dispatch = useDispatch();

    // 유저 데이터
    const member = useSelector(state=>state.member);

    const [data,setData] = useState([]);

    // 업데이트 페이지
    const updateHandler = (e)=>{
        navigate(`write/${e}`);
    }

    // 삭제 페이지
    const deleteHandler = (e)=>{
        dispatch(deleteAction(e));
        alert('삭제가 완료 되었습니다.');
    }

    // 권한 수정
    const rankUpdate = (e,a)=>{

        a.preventDefault();
  
            if(window.confirm('권한을 수정하겠습니까?')){
            
            const pushData = {
                seq : e.seq,
                rank : a.target.value
            }

            dispatch(updateRank(pushData));

            }else{

            a.target.value = e.rank;

        }

    }

    // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 페이지관련 

    // 현재 페이지
    const [currentPage,setCurrentPage] = useState(1);

    useEffect(()=>{
        setCurrentPage(searchParams.get('page') || 1);
    },[searchParams]);

    // 게시물 총 갯수
    const [total,setTotal] = useState(member.length);
    // 최대 게시물
    const limit = 10; 
    // 총 페이지
    const [totalPage,setTotalPage] = useState(Math.ceil(total/limit)); 

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

    // 페이지 생성
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

    },[currentPage, total]);

    // 쿼리스트링에 따른 값
    useEffect(()=>{
        
        let copy = [...member];

        const type = searchParams.get('type') || "";
        const search = searchParams.get('search') || "";

        const filter = copy.filter(e=>{
            if(type == ""){
                return e['userID'].includes(search) || e['nickName'].includes(search);
            }else{
                if(typeof e[type] == "string"){
                    return e[type].includes(search)
                }
            }
        });

        // 토탈수정
        setTotal(filter.length);
        setTotalPage(Math.ceil(filter.length/limit));

        const sclie = filter.slice((currentPage - 1)*limit,limit*currentPage);
        setData(sclie);

    },[searchParams, currentPage]);


    // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 검색관련
    const searchSubmit = (a)=>{

        a.preventDefault();

        const select = a.target.selector.value;
        const input = a.target.searchInput.value;

        searchParams.set('type',select);
        searchParams.set('search',input);
        setSearchParams(searchParams);

    }

    // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 체크박스
    const [chkItem,setChkItem] = useState([]);
    const allChkHandler = (e)=>{
        if(e.target.checked){
            const arr = [];
            data.forEach(e=>arr.push(e.seq));
            setChkItem(arr);
        }else{
            setChkItem([]);
        }
    }

    const singleChkHanlder = (e,seq)=>{
        if(e.target.checked){
            setChkItem((prev)=>[...prev,seq])
        }else{
            setChkItem(chkItem.filter(el=> el !== el.seq));
        }
    }

    useEffect(()=>{
        setChkItem([]);
    },[searchParams])



  return (
    <>
        <form onSubmit={searchSubmit}>
            <div className="layout top">
                <select className="lay-select" name='selector'>
                    <option value="">전체</option>
                    <option value="userID">아이디</option>
                    <option value="nickName">닉네임</option>
                </select>
                <label htmlFor="search" className="lay-search compo-lay">
                    <div className="icon"><BiSearch/></div>
                    <input id="search" type="text" name='searchInput' placeholder='Search...' />
                </label>
            </div>
        </form>

        <div className="layout">

            <div className="table-grid">
        
                <div className="col" style={{gridTemplateColumns: "75px 120px repeat(4,1fr) 150px"}}>

                    <label htmlFor="allchk" className='table-check'>
                        <input 
                            type="checkbox" 
                            name="allchk" 
                            id="allchk"
                            checked={
                                chkItem.length > 0 ? 
                                    data.length === chkItem.length ? true : false 
                                : false
                            }
                            onChange={allChkHandler}
                            readOnly
                        />
                        <div><BsCheck/></div>
                    </label>
                    <p>번호</p>     
                    <p>아이디</p>
                    <p>닉네임</p>
                    <p>권한</p>
                    <p>작성날짜</p>
                    <p>Action</p>

                </div>

                {
                    data.map((e,i)=>(

                        <div 
                            className="col" 
                            style={{gridTemplateColumns: "75px 120px repeat(4,1fr) 150px"}}
                            key={i}
                        >

                            <label htmlFor={`chk${e.seq}`} className='table-check'>
                                <input 
                                    type="checkbox" 
                                    id={`chk${e.seq}`}
                                    checked={chkItem.includes(e.seq) ? true : false}
                                    onChange={(event)=>singleChkHanlder(event,e.seq)}
                                />
                                <div><BsCheck/></div>
                            </label>

                            <p>{(i+1) + (limit * (currentPage - 1))}</p>

                            <Link to={`view/${e.seq}`}>{e.userID}</Link>

                            <p>{e.nickName}</p>

                            <select 
                                className='table-select'
                                defaultValue={e.rank}
                                onChange={(a)=>rankUpdate(e,a)}
                            >
                                {
                                    [1,2,3,4,5,6,7,8,9,10].map((a)=>(
                                        <option 
                                            key={a}
                                            value={a}
                                        >{a}</option>
                                    ))
                                }
                            </select>

                            <p>{e.wtDate}</p>
                                    
                            <div className='table-action'>
                                <button 
                                    className='update' 
                                    onClick={()=>updateHandler(e.seq)}
                                ><BiSolidWrench/></button>
                                <button 
                                    className='delete'
                                    onClick={()=>deleteHandler(e.seq)}
                                ><MdOutlineDelete/></button>
                            </div>

                        </div>

                    ))
                }

            </div>

            <div className="paging">
  
                {
                    prev > 0 &&
                    <button 
                        className='prev'
                        onClick={()=>{
                            searchParams.set('page',prev);
                            setSearchParams(searchParams);
                        }}
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
                                searchParams.set('page',e);
                                setSearchParams(searchParams);
                            }}
                        >{e}</button>
                    ))
                }
        
                {
                    last < totalPage &&
                    <button 
                        className='next'
                        onClick={()=>{
                            searchParams.set('page',next);
                            setSearchParams(searchParams);
                        }}
                    >
                        <AiOutlineRight/>
                    </button>
                }
                
            </div>

            <div className="btn-list">
                <Button color={"color02"}>선택 삭제</Button>
                <Button onClick={()=>navigate('write')}>등록</Button>
            </div>

        </div>

    </>
  )
}
