import React,{useState} from 'react'
import Calendar from "react-calendar";
import moment from "moment";
import {FiCalendar} from "react-icons/fi"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function InputCalender(){

    const [dateOpen,setDateOpen] = useState(false);
    const [date,setDate] = useState(new Date());

    return (

        <div className="input-calender">
            <label htmlFor="date">작성날짜</label>
            <div className="cal-box">
                <input type="text" name="date" id="date" value={moment(date).format("YYYY-MM-DD")} readOnly onClick={()=>setDateOpen(true)}/>
                <FiCalendar/>
            </div>
            {
                dateOpen &&
                <Calendar
                    value={date}
                    onChange={setDate}
                    onClickDay={()=>{setDateOpen(false)}}
                />
            }
        </div>

    )

}


export default InputCalender