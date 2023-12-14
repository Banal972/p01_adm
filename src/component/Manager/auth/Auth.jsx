import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import axios from 'axios';

function Auth({children}) {

    // 네비게이터
    const navigate = useNavigate();

    // 세션 가져오기
    const [lm,setLm] = useState(null);

    useEffect(()=>{

        axios.get("/api/login/auth")
        .then(({data})=>{
            if(data.suc){
                setLm(data.info);
            }
        })
        .catch(err=>console.error(err))

    },[]);

    if (lm) {

        if(lm.mb_role < 10){
            alert("관리자가 아닙니다.");
            return <Navigate to={'/manager'} />
        }else{

            return (
                <>
                    {children}
                </>
            )

        }

    }
    
}


export default Auth