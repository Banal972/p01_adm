import React,{useEffect,useState} from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { ResponsivePie } from '@nivo/pie'
import moment from 'moment'

// 리덕스
import { useSelector } from 'react-redux'

// 라우터모듈
import { useNavigate, useSearchParams } from 'react-router-dom'

// 아이콘
import {AiOutlineLeft,AiOutlineRight} from "react-icons/ai"

// 컴포넌트
import Cal from '../../compoent/Cal'

function Log() {

  const week = new Date().setDate(new Date().getDate() - 7);

  const [startDate,setStartDate] = useState(new Date(week));
  const [endDate,setEndDate] = useState(new Date());

  const onWeek = ()=>{
    const week = new Date().setDate(new Date().getDate() - 7);
    setStartDate(new Date(week));
    setEndDate(new Date());
  }

  const onMonth = ()=>{
    const month = new Date().setDate(new Date().getDate() - 30);
    setStartDate(new Date(month));
    setEndDate(new Date());
  }

  return (
    <div className="_log">
      <div className="layout top">
        <Cal
          start = {startDate}
          setStartDate = {setStartDate}
          end = {endDate}
          setEndDate = {setEndDate}
        />
        <button className='btn-n' onClick={onWeek}>1 WEEK</button>
        <button className='btn-n' onClick={onMonth}>1 Month</button>
      </div>

      <div className="flex">

        <div className="layout">

          <BarGraph
            start = {startDate}
            end = {endDate}
          />

          <WeekBorad
            start = {startDate}
            end = {endDate}
          />

        </div>
        
        {
          <div className="layout">

            <BroswerGraph
              start = {startDate}
              end = {endDate}
            />

            <DeviceGraph
              start = {startDate}
              end = {endDate}
            />

          </div>
        }

      </div>
    </div>
  )

}

// 일주일간 알려주는 게시판
function WeekBorad({start,end}){

  // 쿼리 스트링
  const [searchParams, setSearchParams] = useSearchParams();

  // 유저 데이터
  const getData = useSelector(state=>state.logManager);

  const [data,setData] = useState([]);

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

    const startDate = moment(start).format("YYYYMMDD");
    const endDate = moment(end).format("YYYYMMDD");

    const filter = getData.filter(e=> moment(e.wDate).format("YYYYMMDD") >= startDate && moment(e.wDate).format("YYYYMMDD") <= endDate);

    const groupData = {};
    filter.forEach(e=>{
      const data = e.wDate;
      if(!groupData[data]){
        groupData[data] = 1;
      }else{
        groupData[data]++;
      }
    });

    const changeData = Object.keys(groupData).map(e=>{
      return {
        date : e,
        접속인원 : groupData[e]
      }
    });

    // 토탈수정
    setTotal(changeData.length);
    setTotalPage(Math.ceil(changeData.length/limit));

    const sclie = changeData.slice((currentPage - 1)*limit,limit*currentPage);
    
    // 정렬
    const sort = sclie.sort((a,b)=>{
      if (a.date > b.date) {
        return 1;
      }
      if (a.date < b.date) {
        return -1;
      }
      
      return 0;
    })

    setData(sort);


  },[currentPage, getData, start, end]);

  return (
    <>
      <div className="table-grid">
      
        <div className="col" style={{gridTemplateColumns: "repeat(2,1fr)"}}>
            <p>날짜</p>
            <p>접속 인원</p>
        </div>

        {
          data.length > 0 ?
              data.map((e,i)=>(

                  <div 
                      className="col" 
                      style={{gridTemplateColumns: "repeat(2,1fr)"}}
                      key={i}
                  >
                      <p>{e.date}</p>
                      <p>{e.접속인원}</p>
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
    </>
  )
  
}

// 바 그래프
function BarGraph({start,end}){

  const [graph,setGraph] = useState([]);

  const log = useSelector(state=>state.logManager);

  useEffect(()=>{

    const startDate = moment(start).format("YYYYMMDD");
    const endDate = moment(end).format("YYYYMMDD");

    const filter = log.filter(e=> moment(e.wDate).format("YYYYMMDD") >= startDate && moment(e.wDate).format("YYYYMMDD") <= endDate);

    const groupData = {};
    filter.forEach(e=>{
      const data = e.wDate;
      if(!groupData[data]){
        groupData[data] = 1;
      }else{
        groupData[data]++;
      }
    });

    const changeData = Object.keys(groupData).map(e=>{
      return {
        date : e,
        접속인원 : groupData[e]
      }
    });

    // 정렬
    const sort = changeData.sort((a,b)=>{
      if (a.date > b.date) {
        return 1;
      }
      if (a.date < b.date) {
        return -1;
      }
      
      return 0;
    });

    setGraph(sort);

  },[start,end]);

  return (
    <>
      { graph.length > 0 ?
        <div style={{ width: '100%', height: '350px', marginBottom:45 }}>
          <ResponsiveBar
    
              // chart 데이터
              data={graph}
              
              // 출력할 키
              keys={['접속인원']}
              
              // 어떤거 기준
              indexBy="date"
              
              // 차트 간격
              margin={{ top: 10, right: 0, bottom: 30, left: 30 }}
              
              // bar 끼리 간격
              padding={0.4}
              
              // bar 색상
              colors={['skyblue']} // 커스터하여 사용할 때
              
              // color 적용방식
              // colorBy="id" // keys값 마다
              colorBy="indexValue" // indexBy기준
    
              // 라벨 사용 안함
              enableLabel={false}
              // 마우스 올렸을때 나오는 인터페이스 사용안함
              isInteractive={false}
              // 테마설정
              theme={{
    
                  // 다른 텍스트
                  axis: {
    
                      // 텍스트 크기 하단 과 왼쪽
                      ticks: {
                          line : {
                            strokeWidth : 0,
                          },
                          text: {
                              fontSize: 14,
                              fontFamily : "Pretendard",
                              fill: '#000000',
                          },
                      },
    
                  },
              }}
    
          />
        </div>
        : <p>데이터가 존재하지 않습니다</p>
      }
    </>
  )
  
}

// 브라우저 그래프
function BroswerGraph({start,end}){

  const [graph,setGraph] = useState([]);

  const log = useSelector(state=>state.logManager);

  useEffect(()=>{

    const startDate = moment(start).format("YYYYMMDD");
    const endDate = moment(end).format("YYYYMMDD");

    const filter = log.filter(e=> moment(e.wDate).format("YYYYMMDD") >= startDate && moment(e.wDate).format("YYYYMMDD") <= endDate);

    const groupData = {};
    filter.forEach(e=>{
      const broswer = e.broswer;
      if(!groupData[broswer]){
        groupData[broswer] = 1;
      }else{
        groupData[broswer]++;
      }
    });

    const changeData = Object.keys(groupData).map(e=>{
      return {
        id : e,
        label : e,
        value : groupData[e]
      }
    });

    setGraph(changeData);

  },[start,end]);

  return (
    <>
      { graph.length > 0 ?
        <div className="pie">

          <div style={{width:"100%",height:250}}>
    
            <ResponsivePie
            
              data={graph}
              animate={true}
              motionConfig={'gentle'}
              transitionMode='innerRadius'
              innerRadius={0.3}
              enableArcLinkLabels={false}
              isInteractive={false}
              arcLabel={e=>e.id+" ("+e.value+")"}
              theme={{
                labels : {
                  text  : {
                    fontFamily : "Pretendard"
                  }
                }
              }}
    
            />
    
          </div>
    
          <p>브라우저 ({moment(start).format("YYYY.MM.DD")} ~ {moment(end).format("YYYY.MM.DD")})</p>
    
        </div>
        : <p>데이터가 존재하지 않습니다</p>
      }
    </>
  )
  
}

// 디바이스 그래프
function DeviceGraph({start,end}){
  
  const [graph,setGraph] = useState([]);

  const log = useSelector(state=>state.logManager);

  useEffect(()=>{

    const startDate = moment(start).format("YYYYMMDD");
    const endDate = moment(end).format("YYYYMMDD");

    const filter = log.filter(e=> moment(e.wDate).format("YYYYMMDD") >= startDate && moment(e.wDate).format("YYYYMMDD") <= endDate);

    const groupData = {};
    filter.forEach(e=>{
      const device = e.device;
      if(!groupData[device]){
        groupData[device] = 0;
      }
      groupData[device] ++;
    });

    const changeData = Object.keys(groupData).map(e=>{
      return {
        id : e,
        label : e,
        value : groupData[e]
      }
    });

    setGraph(changeData);

  },[start,end]);


  return (
      <>
      
        {
          graph.length > 0 ?
          <div className="pie">

            <div style={{width:"100%",height:250}}>
                <ResponsivePie

                data={graph}

                animate={true}
                innerRadius={0.3}
                enableArcLinkLabels={false}
                isInteractive={false}
                arcLabel={e=>e.id+" ("+e.value+")"}
                theme={{
                    labels : {
                    text  : {
                        fontFamily : "Pretendard"
                    }
                    }
                }}
                

                />
            </div>

            <p>디바이스 ({moment(start).format("YYYY.MM.DD")} ~ {moment(end).format("YYYY.MM.DD")})</p>

          </div>
          : <p>데이터가 존재하지 않습니다</p>
        }
      
      </>
  )

}

export default Log