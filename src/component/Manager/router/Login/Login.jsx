import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import logo from "../../asset/image/logo.svg";
import { BsCheck } from "react-icons/bs"

function Login() {

    // 네비게이터
    const navigate = useNavigate();

    const [lm,setLm] = useState(undefined);

    // 인풋State
    const [inputID,setInputID] = useState('');
    const [inputPW,setInputPW] = useState('');

    // 인풋Handler
    const onInput = (e,fun)=>{
        fun(e.target.value);
    }


    return (
        <div className='manager-login'>
            <form onSubmit={e=>{
                
                e.preventDefault();
    
                axios.post('/api/login',{
                    inputID : inputID,
                    inputPW : inputPW
                })
                .then(({data})=>{
                    
                    if(data.suc === true){
                        alert('로그인에 성공했습니다.');
                        navigate('main');
                    }else{
                        alert(data.msg);
                    }
        
                })
                .catch(err=>console.error(err));
    
            }}>
    
                <div className="logo">
                    <img src={logo} alt="로고" />
                </div>
    
                <div className="it">
                    <input type="text" value={inputID} placeholder='아이디' onInput={(e)=>onInput(e,setInputID)}/>
                </div>
                <div className="it">
                    <input type="password" value={inputPW} placeholder='패스워드' onInput={(e)=>onInput(e,setInputPW)} />
                </div>
                <label htmlFor="" className='check'>
                    <input type="checkbox" name="" id="" />
                    <div><BsCheck/></div>
                    아이디저장
                </label><br/>
                <button type='submit'>로그인</button>
            </form>
        </div>
    );

}

export default Login