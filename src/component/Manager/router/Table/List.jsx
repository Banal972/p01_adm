import React, { useEffect, useState } from 'react'
import Button from '../../compoent/Button'
import {AiOutlineLeft,AiOutlineRight} from "react-icons/ai"
import {BsCheck} from "react-icons/bs"
import {MdOutlineDelete} from "react-icons/md"
import {BiSolidWrench,BiSearch} from "react-icons/bi"
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAction, multipleDeleteAction } from '../../store/board'

export default function List() {

    // 파라미터
    const {table} = useParams();

    // 쿼리 스트링
    const [searchParams, setSearchParams] = useSearchParams();

    // 네비게이터
    const navigate = useNavigate();

    // 디스패치
    const dispatch = useDispatch();

    // 유저 데이터
    const getData = useSelector(state=>state.boardManager);

    const [data,setData] = useState([]);

    // 업데이트 페이지
    const updateHandler = (e)=>{
        navigate(`write/${e}`);
    }

    // 삭제 페이지
    const deleteHandler = (e)=>{
        const push = {
            table,
            seq : e,
        }
        dispatch(deleteAction(push));
        alert('삭제가 완료 되었습니다.');
    }

    // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 이미지 게시판인지 아닌지

    const tableManager = useSelector(state=>state.tableManager);

    const [img,setImg] = useState(false);

    useEffect(()=>{
        const filter = tableManager.filter(e=>e.board_table == table);

        if(filter.length > 0){

            if(filter[0].img == "Y"){
                setImg(true);
            } else{
                setImg(false);
            }

        }

    },[table]);

    // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 페이지관련 

    // 현재 페이지
    const [currentPage,setCurrentPage] = useState(1);

    useEffect(()=>{
        setCurrentPage(searchParams.get('page') || 1);
    },[searchParams]);

    // 게시물 총 갯수
    const [total,setTotal] = useState(getData.length);
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

    },[currentPage, total, getData]);

    // 쿼리스트링에 따른 값
    useEffect(()=>{
        
        const tableData = getData.filter(e=>e.board_table == table)[0]?.data;

        if(!tableData){
            alert('오류가 발생했습니다.');
            return navigate(-1);
        }

        const type = searchParams.get('type') || "";
        const search = searchParams.get('search') || "";

        const filter = tableData.filter(e=>{
            if(type == ""){
                return e['title'].includes(search) || e['content'].includes(search);
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

    },[searchParams, currentPage, getData, table]);


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
    },[searchParams,data])



  return (
    <>
        <form onSubmit={searchSubmit}>
            <div className="layout top">
                <select className="lay-select" name='selector'>
                    <option value="">전체</option>
                    <option value="title">제목</option>
                    <option value="content">내용</option>
                </select>
                <label htmlFor="search" className="lay-search compo-lay">
                    <div className="icon"><BiSearch/></div>
                    <input id="search" type="text" name='searchInput' placeholder='Search...' />
                </label>
            </div>
        </form>

        <div className="layout">

            <div className="table-grid">
        
                <div className="col" style={{gridTemplateColumns: `50px 120px 200px repeat(${img ? "3" : "2"},1fr) 150px`}}>

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
                    {
                        img && <p>이미지</p>
                    }
                    <p>제목</p>
                    <p>내용</p>
                    <p>작성자</p>
                    <p>Action</p>

                </div>

                {
                    data.length > 0 ?
                        data.map((e,i)=>(

                            <div 
                                className="col" 
                                style={{gridTemplateColumns: `50px 120px 200px repeat(${img ? "3" : "2"},1fr) 150px`}}
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

                                {
                                    img &&
                                    <img src={e.imgURL} alt="" />
                                }

                                <Link to={`view/${e.seq}`}>{e.title}</Link>

                                <p>{e.content}</p>

                                <p>{e.writer}</p>
                                        
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
                    :
                    <p style={{textAlign : "center", padding : "20px 0", borderTop : "1px solid #EEF4F4"}}>데이터가 존재하지 않습니다</p>
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
                <Button 
                    color={"color02"}
                    onClick={()=>{
                        if(window.confirm('삭제 하시겠습니까?')){
                            const push = {
                                seq : chkItem,
                                table
                            }
                          dispatch(multipleDeleteAction(push));
                          if( searchParams.get('page') >= totalPage){
                              searchParams.set('page',last-1);
                              setSearchParams(searchParams);
                          }
                        }
                    }}
                >선택 삭제</Button>
                <Button onClick={()=>navigate('write')}>등록</Button>
            </div>

        </div>

    </>
  )
}
