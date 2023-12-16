import React,{useEffect,useState} from 'react'
import {Link, useLocation} from "react-router-dom"
import {BiHomeAlt,BiSolidChat,BiUser,BiCalendarAlt,BiBrightness} from "react-icons/bi"
import { AiOutlinePicture } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';

function Menu() {

    // 파라미터 가져오기
    const location = useLocation();
    const [loca,setLoca] = useState("/");

    useEffect(()=>{
        if(location.pathname == "/"){
            setLoca(location.pathname);
        }else{
            setLoca(location.pathname.split('/')[1]);
        }
        
    },[location])

    // 디스패치
    const dispatch = useDispatch();

    // 게시판 데이터
    const tableManager = useSelector(state=>state.tableManager);

    // 메뉴 테이블 가져오기
    const [menu,setMenu] = useState([]);

    useEffect(()=>{

        console.log(menu);

        const mapMenu = tableManager.map(e=>{
            return {
                board_name : e.board_name,
                board_table : e.board_table
            }
        });

        setMenu(mapMenu);

    },[tableManager]);

  return (
    <div className='manager-menu'>
        <ul className='gnb'>
            <li>
                <Link to={'main'} className={loca === "/" ? "act" : "" } ><div className="icon"><BiHomeAlt/></div> 대시보드</Link>
            </li>
            <li>
                <Link className={loca === "user" ? "act" : "" } to={"user"}><div className="icon"><AiOutlinePicture  /></div> 배너관리</Link>
            </li>
            <li>
                <Link className={loca === "board" ? "act" : "" } to={'board'}><div className="icon"><BiSolidChat/></div> 게시판관리</Link>

                {
                    menu.length > 0 ?
                    <ul className="snb">
                        {
                            menu.map((e,i)=>(
                                <li key={i}><Link to={`board/${e.board_table}`} className={loca === `${e.board_table}` ? "act" : "" }>{e.board_name}</Link></li>
                            ))
                        }
                    </ul>
                    : null
                }

            </li>
            <li>
                <Link className={loca === "user" ? "act" : "" } to={"user"}><div className="icon"><BiUser/></div> 회원관리</Link>
            </li>
            <li>
                <Link className={loca === "log" ? "act" : "" } to={'log'}><div className="icon"><BiCalendarAlt/></div> 접속현황</Link>
            </li>
            {/* <li>
                <Link className={loca === "setting" ? "act" : "" } to={'setting'}><div className="icon"><BiBrightness/></div> 환경설정</Link>
            </li> */}
        </ul>
    </div>
  )
}

export default Menu