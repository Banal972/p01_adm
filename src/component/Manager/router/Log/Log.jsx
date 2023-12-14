import React,{useEffect,useState} from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { ResponsivePie } from '@nivo/pie'
import moment from 'moment'
import axios from 'axios'

// 컴포넌트
import Cal from '../../compoent/Cal'
import LayoutTable from '../../compoent/LayoutTable'

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

    const [data,setData] = useState([]);
  
    useEffect(()=>{
  
      axios.get('/api/log',{
        params : {
          startDate : moment(start).format("YYYY.MM.DD"),
          endDate : moment(end).format("YYYY.MM.DD"),
        }
      })
      .then(({data})=>{
        setData(data);
      })
      .catch(err=>{
        console.error(err);
      });
  
  
    },[start,end]);
    
    return (
  
      <LayoutTable
        head={[{
          text : '날짜',
          value : "date"
        },{
          text : '접속 인원',
          value : "amount"
        }]}
        dataset={data}
      />
  
    )
  
}

// 바 그래프
function BarGraph({start,end}){

    const [graph,setGraph] = useState([]);
  
    useEffect(()=>{
  
      axios.get('/api/log/bar',{
        params : {
          startDate : moment(start).format("YYYY.MM.DD"),
          endDate : moment(end).format("YYYY.MM.DD"),
        }
      })
      .then(res=>{
        const data = res.data
        setGraph(data);
      })
      .catch(err=>{
        console.error(err);
      });
  
  
    },[start,end]);
  
    return (
      <>
        { graph.length > 0 && 
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
        }
      </>
    )
  
}

// 브라우저 그래프
function BroswerGraph({start,end}){

    const [graph,setGraph] = useState([]);
  
    useEffect(()=>{
  
      axios.get('/api/log/browser',{
        params : {
          startDate : moment(start).format("YYYY.MM.DD"),
          endDate : moment(end).format("YYYY.MM.DD"),
        }
      })
      .then(res=>{
        const data = res.data
        setGraph(data);
      })
      .catch(err=>{
        console.error(err);
      });
  
  
    },[start,end]);
  
    return (
      <>
        { graph.length > 0 &&
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
        }
      </>
    )
  
}

// 디바이스 그래프
function DeviceGraph({start,end}){
  
    const [graph,setGraph] = useState([]);

    useEffect(()=>{

        axios.get('/api/log/device',{
          params : {
              startDate : moment(start).format("YYYY.MM.DD"),
              endDate : moment(end).format("YYYY.MM.DD"),
          }
        })
        .then(res=>{
          const data = res.data;
          setGraph(data);
        })
        .catch(err=>{
          console.error(err);
        });


    },[start,end]);

    return (
        <>
        
          {
            graph.length > 0 &&
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
          }
        
        </>
    )

}

export default Log