import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

function Auth({children}) {

    // 세션 가져오기
    const loginUser = useSelector(state=>state.loginMember);
    console.log(loginUser);

    if (loginUser) {

        if(loginUser.rank < 10){
            alert("관리자가 아닙니다.");
            return <Navigate to={'/manager'} />
        }else{

            return (
                <>
                    {children}
                </>
            )

        }

    }else{
        alert("비정상적인 접속입니다.");
        return <Navigate to={'/manager'} />
    }
    
}


export default Auth