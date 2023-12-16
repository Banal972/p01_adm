import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import logo from "../../asset/image/logo.svg";
import { BsCheck } from "react-icons/bs"
import { useDispatch, useSelector } from 'react-redux';
import { addAction } from '../../store/login';
import { useCookies } from 'react-cookie';

function Login() {

    // 네비게이터
    const navigate = useNavigate();

    // selector
    const member = useSelector(state => state.member);
    const dispath = useDispatch();

    // 인풋State
    const [inputID,setInputID] = useState('');
    const [inputPW,setInputPW] = useState('');

    // 인풋ref
    const inputRef = useRef(null);
    const passRef = useRef(null);

    // 인풋Handler
    const onInput = (e,fun)=>{
        fun(e.target.value);
    }

    // 쿠키
    const [cookie,setCookie,removeCookie] = useCookies(['idsave']);
    const idref = useRef(null);

    useEffect(()=>{
        if(cookie.idsave){
            setInputID(cookie.idsave);
        }
    },[cookie]);

    // 로그인폼
    const onSubmit = (e)=>{
        e.preventDefault();
        
        if(inputID == ""){
            inputRef.current.focus();
            return alert('아이디를 입력해주세요');
        }

        if(inputPW == ""){
            passRef.current.focus();
            return alert('비밀번호를 입력해주세요');
        }

        const chid = member.filter(e=> e.userID == inputID);

        if(chid.length > 0 && chid){
            
            if(chid[0].userPW == inputPW){

                dispath(addAction(chid[0]));
                if(idref.current.checked){
                    setCookie('idsave',inputID);
                }else{
                    removeCookie('idsave');
                }
                alert('로그인이 완료 되었습니다');

                return navigate('main');

            }else{

                passRef.current.focus();
                setInputPW('');
                return alert ('비밀번호가 다릅니다');

            }

        }else{
            inputRef.current.focus();
            setInputID('');
            return alert ('아이디가 존재하지 않습니다');
        }

    }

    return (
        <div className='manager-login'>
            <form onSubmit={onSubmit}>
    
                <div className="logo">
                    <img src={logo} alt="로고" />
                </div>
    
                <div className="it">
                    <input 
                        type="text"
                        ref={inputRef}
                        value={inputID} 
                        placeholder='아이디' 
                        onInput={(e)=>onInput(e,setInputID)}
                    />
                </div>

                <div className="it">
                    <input 
                        type="password"
                        autoComplete='off'
                        ref={passRef}
                        value={inputPW} 
                        placeholder='패스워드' 
                        onInput={(e)=>onInput(e,setInputPW)} 
                    />
                </div>

                <label htmlFor="chk" className='check'>
                    <input 
                        type="checkbox" 
                        id="chk" 
                        ref={idref}
                        defaultValue={cookie.idsave ? true : false}
                    />
                    <div><BsCheck/></div>
                    아이디저장
                </label>

                <br/>

                <button type='submit'>로그인</button>

            </form>
        </div>
    );

}

export default Login