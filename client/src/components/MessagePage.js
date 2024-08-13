import React, { useEffect, useState } from "react";
import {useSelector} from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { IoMdSend } from 'react-icons/io'
import { FaAngleLeft, FaPlus } from 'react-icons/fa6'
import backgroundImage from '../assets/wallapaper.jpeg'
import Avatar from "./Avatar";

const MessagePage = () => {
    const params = useParams()
    const socketConnection =  useSelector(state=>state?.user?.socketConnection)
    const user = useSelector(state=>state?.user)
    const [dataUser,setDataUser] = useState({
        name: "",
        email: "",
        profile_pic: "",
        online: false,
        _id: ""
    })

    /**
     * 소켓통신하기
     */
    useEffect(()=>{
        if (socketConnection){
            socketConnection.emit('message-page', params.userId)
            socketConnection.on('message-user',(data)=>{
                setDataUser(data) //상대방 1명 정보
            })
        }
    },[socketConnection, params?.userId, user])

    return(
        <div style={{ backgroundImage : `url(${backgroundImage})`}} className='bg-no-repeat bg-cover'>
            <header className='sticky top-0 h-16 bg-white flex justify-between items-center px-4'>
                <div className='flex items-center gap-4'>
                    <Link>
                        <FaAngleLeft size={25}/>
                    </Link>
                    <div>
                        <Avatar
                            userId={dataUser?._id}
                            name={dataUser?.name}
                            imageUrl={dataUser?.profile_pic}
                            width={50}
                            height={50}
                        />
                    </div>
                </div>
            </header>

            {/* 모든 메세지 표시 */}
            <section className='h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar relative bg-slate-200 gb-opacity-50'>
                <div className='flex flex-col gap-2 py-2 mx-2'>
                    <div className={`p-1 py-1 rounded w-fit max-w-[280px] md:max-w-sm lg:max-w-md bg-white`}>
                        <p className='px-2'>방학때 강의 열심히 듣기 바랍니다.</p>
                        <p className='text-xs ml-auto w-fit'>12:55</p>
                    </div>
                    <div className={`p-1 py-1 rounded w-fit max-w-[280px] md:max-w-sm lg:max-w-md ml-auto bg-teal-100`}>
                        <p className='px-2'>넵, 열심히 하겠습니다.</p>
                        <p className='text-xs ml-auto w-fit'>12:55</p>
                    </div>
                </div>
            </section>

            {/* 메세지 보내기 */}
            <section className='h-16 bg-white flex items-center px-4'>
                <div className="relative">
                    <button className='flex justify-center items-center w-11 h-11 rounded-full hover:bg-primary hover:text-white'>
                        <FaPlus size={20}/>
                    </button>
                </div>
                <form className='h-full w-full flex gap-2'>
                    <input type='text' placeholder="메세지를 입력하세요..." className='py-1 px-4 outline-none w-full h-full'/>
                    <button className='text-primary hover:text-secondary'>
                        <IoMdSend size={28}/>
                    </button>
                </form>
            </section>
        </div>
    )
}

export default MessagePage