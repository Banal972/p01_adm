import React, { useEffect, useState } from 'react'
import {BsCheck} from "react-icons/bs"
import Button from '../../compoent/Button'
import axios from 'axios'

function Setting() {

    const [weather,setWeather] = useState('n');
    const [calender,setCalender] = useState('n');
  
    useEffect(()=>{
  
      axios.get('/api/site')
      .then(({data})=>{
        setWeather(data[0].weather);
        setCalender(data[0].calender);
      })
      .catch(err=>{
        console.error(err);
      });
  
    },[]);

    const onCheck = (e,fun)=>{

      if(e.target.value == 'y'){
        fun('n');
      }else{
        fun('y');
      }

    }

    const onClick = ()=>{

      console.log(weather,calender);

      axios.put('/api/site',{
        weather : weather,
        calender : calender,
      })
      .then(({data})=>{
        if(data.suc){
          alert(data.msg);
        }else{
          alert(data.msg);
        }
      })
      .catch(err=>console.error(err));
    }
  
    return (
      <div className="layout">
  
        <div className="input-checkbox">
          <p>위젯 사용</p>
          
          <label htmlFor="weather" className='table-check'>
              <input type="checkbox" id="weather" value={weather} defaultChecked={weather === 'y' ? true : false} onClick={(e)=>onCheck(e,setWeather)} />
              <div><BsCheck/></div>
              날씨 위젯
          </label>
          
          <label htmlFor="calender" className='table-check'>
              <input type="checkbox" id="calender" value={calender} defaultChecked={calender === 'y' ? true : false} onClick={(e)=>onCheck(e,setCalender)} />
              <div><BsCheck/></div>
              캘린더 위젯
          </label>
  
        </div>
  
        <Button color={"color02"} style={{margin:"150px auto 0"}} onClick={onClick}>수정</Button>
  
      </div>
    )

}

export default Setting