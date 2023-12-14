import React,{useEffect, useState} from 'react'
import {BiCalendar} from "react-icons/bi"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import moment from "moment"

function Cal({start,setStartDate,end,setEndDate}) {

    return (
        <>
            <div className="lay-cal compo-lay">
                
                <CalButton
                    date = {start}
                    setDate = {setStartDate}
                />
                
                <span style={{margin:"0 5px"}}>~</span>

                <CalButton
                    date = {end}
                    setDate = {setEndDate}
                />

            </div>
        </>
    )

    function CalButton({date,setDate}){

        const [open,setOpen] = useState(false);

        return (
            <>
            <div className="calBtn">
                <button onClick={()=>setOpen(!open)}>
                {moment(date).format("YYYY.MM.DD")} <div className="icon"><BiCalendar/></div>
                </button>

                {
                    open &&
                    <Calendar 
                        onChange={setDate} 
                        value={date}
                        onClickDay={()=>{setOpen(false)}}
                    />
                }
                
            </div>
            </>
        )

    }

}

export default Cal