import React, { useEffect, useState } from 'react'

function MainTable({tit,table}) {

    const [dataset,setDataset] = useState([]);
    const [news,setNews] = useState([]);

    useEffect(()=>{

    },[]);

    return (
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

export default MainTable