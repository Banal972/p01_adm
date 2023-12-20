import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Button from '../../compoent/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { FiCalendar } from 'react-icons/fi';

function View({
    api
}) {

    // 파라미터
    const { seq,table } = useParams();

    // 네비게이터
    const navigate = useNavigate();

    // 데이터 가져오기
    const getStore = useSelector(state=>state[api || "bannerManager"]);

    // 데이터 수정
    const [data,setData] = useState({});

    useEffect(()=>{

        if(!table){
            
            const filter = getStore.filter(e=>e.seq == seq);
            setData(filter[0]);
    
            console.log(filter[0]);

        }else{

            const get = getStore.filter(e=>e.board_table == table);

            const filter = get[0].data.filter(e=>e.seq == seq);
            setData(filter[0]);

        }

    },[getStore, seq]);

  return (
    <div className="layout">

        {
            data.main ?
                <div 
                    className="view-lay01"
                    style={{display : "inline-flex"}}
                >
                    <div className="box">
                        {
                            data.main == 'Y' ? "메인 출력" : "메인 출력 X"
                        }
                    </div>
                </div>
            : null
        }

        {
            data.title &&
            <div className='view-lay01' style={{maxWidth : 250}}>
                <p>제목</p>
                <p className='box'>{data.title}</p>
            </div>
        }

        {
            data.board_name &&
            <div className='view-lay01'>
                <p>게시판 이름</p>
                <p className='box'>{data.board_name}</p>
            </div>
        }

        {
            data.nickName &&
            <div className='view-lay01'>
                <p>닉네임</p>
                <p 
                    className='box'
                    style={{maxWidth : 250}}
                >{data.nickName}</p>
            </div>
        }

        {
            data.userID &&
            <div className='view-lay01'>
                <p>아이디</p>
                <div 
                    className='box'
                    style={{maxWidth : 250}}
                >{data.userID}</div>
            </div>
        }

        {
            data.rank &&
            <div className='view-lay01'>
                <p>권한</p>
                <div 
                    className="box" 
                    style={{display : "inline-flex"}}
                >{data.rank}</div>
            </div>
        }


        {
            data.board_table &&
            <div className='view-lay01'>
                <p>테이블 이름</p>
                <div className="box">{data.board_table}</div>
            </div>
        }

        {
            data.img &&
            <div className='view-lay01'>
                <p>갤러리 게시판</p>
                <div 
                    className="box" 
                    style={{display : "inline-flex"}}
                >{data.img}</div>
            </div>
        }

        {
            data.email &&
            <div className='view-lay01'>
                <p>이메일</p>
                <div className="box">{data.email}</div>
            </div>
        }
        

        {
            data.content &&
            <div className='view-lay01'>
                <p>내용</p>
                <div className="box">{data.content}</div>
            </div>
        }

        {
            data.imgURL &&
            <div className='view-lay01'>
                <p>이미지</p>
                <img src={data.imgURL} alt="" />
            </div>
        }

        {
            data.writer &&
            <div className='view-lay01'>
                <p>작성자</p>
                <div 
                    className="box"
                    style={{display : "inline-flex"}}
                >{data.writer}</div>
            </div>
        }



        {
            data.wtDate &&
            <div className='view-lay01'>
                <p>작성 날짜</p>
                <div 
                    className="cal-box"
                    style={{display : "inline-flex"}}
                >
                    {data.wtDate}
                </div>
            </div>
        }
        {
            data.wData &&
            <div className='view-lay01'>
                <p>작성 날짜</p>
                <div 
                    className="cal-box"
                    style={{display : "inline-flex"}}
                >
                    {data.wData}
                </div>
            </div>
        }
        {
            data.wDate &&
            <div className='view-lay01'>
                <p>작성 날짜</p>
                <div 
                    className="cal-box"
                    style={{display : "inline-flex"}}
                >
                    {data.wDate}
                </div>
            </div>
        }

        

        <div className="btn-list">
            <Button color={"color01"} onClick={()=>navigate(-1)}>돌아가기</Button>
        </div>

    </div>
  )
}

export default View