import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from '../assets/kakaologo.png'
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { setUser, logout, setOnlineUser, setSocketConnection } from '../redux/userSlice'
import io from 'socket.io-client'

const Home = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const basePath = location.pathname === '/'
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    console.log('redux user', user)

    const fetchUserDetails = async()=>{
        try{
            const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`
            const response = await axios({
                url: URL,
                withCredentials: true
            })
            console.log('current user', response)

            //1. 리덕스에 쓰기
            dispatch(setUser(response.data.data))

            //2. 쿠키에 토큰이 없을 때 로그인페이지로 이동
            if (response.data.data.logout){
                dispatch(logout())
                navigate('/email')
            }
        }catch(error){
            dispatch(logout())
            navigate('/email')
        }
    }
    useEffect(()=>{
        fetchUserDetails()
    })

    /**
     * 소켓서버로 통신시작
     */
    useEffect(()=>{
        const socketConnection = io(process.env.REACT_APP_BACKEND_URL,{
            auth: {
                token: localStorage.getItem('token')
            }
        })
        socketConnection.on('onlineUser',(data)=>{
            dispatch(setOnlineUser(data)) //접속한 사람들 저장
        })
        dispatch(setSocketConnection(socketConnection))
        return () =>{
            socketConnection.disconnect()
        }
    },[]) //두번째 인자값 []면 Home.js가 로드된 이후 최초 1번만 실행

    return(
        <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
            <section className={`bg-white ${!basePath && 'hidden'} lg:block`}>
                <Sidebar/>
            </section>

            {/* message component */}
            <section className={`${basePath && 'hidden'}`}>
                <Outlet/>
            </section>

            <div className={`justify-center items-center flex-col gap-2 hidden ${!basePath ? "hidden" : "lg:flex"}`}>
                <div>
                    <img width={250} alt='logo' src={logo}/>
                </div>
                <p className="text-lg mt-2 text-slate-500">메세지를 보낼 사용자를 선택하세요.</p>
            </div>
        </div>
    )
}

export default Home