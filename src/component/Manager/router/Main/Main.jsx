import React,{useEffect,useState} from 'react'
import {ResponsiveBar} from "@nivo/bar"
import moment from "moment"

// 컴포넌트
import Cal from '../../compoent/Cal'
import { useSelector } from 'react-redux'

function Main() {

  // 접속현황

  const week = new Date().setDate(new Date().getDate() - 7);

  const [char,setChar] = useState([]);
  const [startDate,setStartDate] = useState(new Date(week));
  const [endDate,setEndDate] = useState(new Date());

  const log = useSelector(state=>state.logManager);
  
  useEffect(()=>{

    const start = moment(startDate).format("YYYYMMDD");
    const end = moment(endDate).format("YYYYMMDD");

    const filter = log.filter(e=> moment(e.wDate).format("YYYYMMDD") >= start && moment(e.wDate).format("YYYYMMDD") <= end);

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
    const sort =  changeData.sort((a,b)=>{
      
      if(a.date > b.date){
        return 1;
      }
      if(a.date < b.date){
        return -1;
      }
      return 0;

    });
    
    setChar(sort);

  },[startDate,endDate]);

  

  // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 게시판 불러오기
  const tableManager = useSelector(state=>state.tableManager);
  const [getBoard,setGetBoard] = useState([]);

  useEffect(()=>{

    const filter = tableManager.filter(e=>e.main == 'Y');
    setGetBoard(filter);

  },[tableManager]);

  return (
    <div className="dashboard">

      <p className="tit">접속현황</p>
      
      <div className="fl">

        <div className='lbx'>
        
          <div className="lay">

              <div className="layout">
                
                <Cal
                  start = {startDate}
                  setStartDate = {setStartDate}
                  end = {endDate}
                  setEndDate = {setEndDate}
                />

                {
                  char.length > 0 &&
                  <div style={{ width: '100%', height: '350px'}}>
                    <ResponsiveBar

                        // chart 데이터
                        data={char}
                        
                        // 출력할 키
                        keys={['접속인원']}
                        
                        // 어떤거 기준
                        indexBy="date"
                        
                        // 차트 간격
                        margin={{ top: 30, right: 0, bottom: 30, left: 30 }}
                        
                        // bar 끼리 간격
                        padding={0.5}
                        
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
                }

              </div>

          </div>

          <div className="grid col-3">
            
            {

              getBoard.map((e,i)=>(
                <MainTable
                  key={i}
                  tit={e.board_name}
                  table={e.board_table}
                />
              ))

            }

          </div>

        </div>

      </div>

    </div>
  )
}

function MainTable({tit,table}){

  const [dataset,setDataset] = useState([]);
  const [news,setNews] = useState([]);

  const boardManager = useSelector(state=>state.boardManager);

  useEffect(()=>{
    
    const filter = boardManager.filter(e=>e.board_table == table)[0].data;

    const newData = filter[filter.length - 1];
    const slice = filter.slice(0,filter.length - 1);

    setNews(newData);
    setDataset(slice);

  },[table]);

  return(
    <div className="lay">
            
      <p className="tit">{tit}</p>

      <div className="layout dash-t">

          {
              dataset.length > 0 ?
              <>
                  <ul className='new'>
                      <li>
                          <div className="new">신규</div>
                          <p>{news.title}</p>
                      </li>
                  </ul>

                  <ul className='table'>
                      {dataset.map((e,i)=>(
                          <li key={i}>
                              <p className='write'>{e.writer}</p>
                              <p className='desc'>{e.title}</p>
                              <span className="date">{e.wDate}</span>
                          </li>
                      ))}
                  </ul>
              </>
              :
              <>데이터가 존재하지 않습니다.</>
          }

      </div>

    </div>
  )

}

export default Main