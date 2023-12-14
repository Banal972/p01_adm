import React,{useEffect,useState} from 'react'
import {ResponsiveBar} from "@nivo/bar"
import axios from "axios"
import moment from "moment"

// 컴포넌트
import Cal from '../../compoent/Cal'
import MainTable from '../../compoent/MainTable'

function Main() {

  // 접속현황

  const week = new Date().setDate(new Date().getDate() - 7);

  const [char,setChar] = useState([]);
  const [startDate,setStartDate] = useState(new Date(week));
  const [endDate,setEndDate] = useState(new Date());

  useEffect(()=>{

    axios.get('/api/log/bar',{
      params : {
        startDate : moment(startDate).format("YYYY.MM.DD"),
        endDate : moment(endDate).format("YYYY.MM.DD"),
      }
    })
    .then(res=>{
      const data = res.data;
      setChar(data);
    })
    .catch(err=>{
      console.error(err);
    });


  },[startDate,endDate]);

  // 게시판 불러오기

  const [getBoard,setGetBoard] = useState([]);

  useEffect(()=>{

    axios.get('/api/board/dash')
    .then(({data})=>{

      if(data.suc){
        setGetBoard(data.data);
      }else{
        alert(data.msg);
      }

    })
    .catch(err=>console.error(err));

  },[]);

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

        {/* <Widget/> */}

      </div>

    </div>
  )
}

// 위젯
function Widget(){

    const [widget,setWidget] = useState({});
    const [wid,setWid] = useState(false);
  
    useEffect(()=>{
  
      axios.get('/api/site')
      .then(res=>{
  
        const {data} = res;
  
        setWidget(data[0]);
  
        for(const key in data[0]){
  
          if(data[0][key] === 'y'){
            setWid(true);
          }
    
        }
  
      })
      .catch(err=>{
        console.error(err);
      });
  
    },[]);
  
    return (
  
      <>
        {
          wid &&
          <div className="widget">
            
            {
              widget.weather === 'y' &&
              <div className="weather">
                <p className='tit'>날씨</p>
                <Weather/>
              </div>
            }
      
            {
              widget.calender === 'y' &&
  
              <div className="weather">
                <p className='tit'>위젯</p>
                <div style={{height:300,width:300,background:"#fff"}}></div>
              </div>
      
            }
      
          </div>
        }
      </>
  
    )
  
}


//날씨
function Weather(){

    const [temp,setTemp] = useState(0);
    const [temp_max,setTemp_max] = useState(0);
    const [temp_min,setTemp_min] = useState(0);
    const [humidity,setHumidity] = useState(0);
    const [desc,setDesc] = useState('');
    const [icon,setIcon] = useState('');
    const [loading,setLoading] = useState(true);
  
    useEffect(()=>{
  
      const cityName = 'Incheon';
      const apiKey = process.env.REACT_APP_WEATHER_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
  
      //위에서 만든 상태 변수에 값을 전달
      axios
        .get(url)
        .then((responseData) => {
          // console.log(responseData);
          const data = responseData.data;
          
          setTemp(data.main.temp);
          setTemp_max(data.main.temp_max);
          setTemp_min(data.main.temp_min);
          setHumidity(data.main.humidity);
          setDesc(data.weather[0].description);
          setIcon(data.weather[0].icon);
          setLoading(false);
  
        })
        .catch((err) => console.log(err));
  
    },[]);
  
    const imgSrc = `https://openweathermap.com/img/w/${icon}.png`;
  
    if(loading){
      return <p>Loading</p>;
    }else{
  
      return (
  
        <>
          {temp}
          {temp_max}
          {temp_min}
          {humidity}
          {desc}
        </>
  
      )
  
    }
  
  
}

//캘린더

export default Main