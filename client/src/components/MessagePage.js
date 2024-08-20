import React, { useEffect, useState } from "react";
import {useSelector} from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { IoMdSend } from 'react-icons/io'
import { FaAngleLeft, FaPlus, FaImage, FaVideo } from 'react-icons/fa6'
import { IoClose } from 'react-icons/io5'
import backgroundImage from '../assets/wallapaper.jpeg'
import Avatar from "./Avatar";
import uploadFile from '../helpers/uploadFile'
import Loading from './Loading'

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
    const [openFileUpload, setOpenFileUpload] = useState(false)
    const [message, setMessage] = useState({
        text: "", // 보낼 메세지
        imageUrl: "", // 보낼 사진
        videoUrl: "" // 보낼 동영상 파일
    })
    const [loading, setLoading] = useState(false)
    
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

    /**
     * 핸들 처리
     */
    const handleUploadFile = async(key,e) => {
        const file = e.target.files[0]
        setLoading(true)
        const response = await uploadFile(file)
        setLoading(false)
        setOpenFileUpload(false)
        console.log('response.url',response.url)
        handleMessageChange(key,response.url)
    }
    const handleMessageChange = (key, value) => {
        setMessage(preve=>{
            return {
                ...preve,
                imageUrl: key==='imageUrl' ? value : preve.imageUrl,
                videoUrl: key==='videoUrl' ? value : preve.videoUrl,
                text: key==='text' ? value : preve.text
            }
        })
    }
    const handleSendMessage = (e) => {
        e.preventDefault()
        if (message.text || message.imageUrl || message.videoUrl){
            console.log(`message.text:${message.text}, message.imageUrl:${message.imageUrl}, message.videoUrl:${message.videoUrl}`)
            
            if (socketConnection){

            }
        }
    }

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

                {/* 업로드하는 이미지 미리보기 */}
                {
                    message.imageUrl && (
                        <div className='w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden'>
                            <div onClick={()=>handleMessageChange('imageUrl','')} className='w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600'>
                                <IoClose size={30}/>
                            </div>
                            <div className='bg-white p-6'>
                                <img 
                                    src={message.imageUrl}
                                    className='aspect-square w-full h-full max-w-sm object-scale-down'
                                />
                            </div>
                        </div>
                    )
                }


                {/* 업로드하는 비디오 미리보기 */}
                {
                    message.videoUrl && (
                        <div className='w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden'>
                            <div onClick={()=>handleMessageChange('videoUrl','')} className='w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600'>
                                <IoClose size={30}/>
                            </div>
                            <div className='bg-white p-6'>
                                <video
                                    src={message.videoUrl}
                                    className='aspect-square w-full h-full max-w-sm object-scale-down'
                                    controls
                                    muted
                                    autoPlay
                                />
                            </div>
                        </div>
                    )
                }    
                {
                    loading && (
                        <div className='w-full h-full flex sticky bottom-0 justify-center items-center'>
                            <Loading />
                        </div>
                    )
                }            
            </section>

            {/* 메세지 보내기 */}
            <section className='h-16 bg-white flex items-center px-4'>
                <div className="relative" onClick={()=>setOpenFileUpload(preve=>!preve)}>
                    <button className='flex justify-center items-center w-11 h-11 rounded-full hover:bg-primary hover:text-white'>
                        <FaPlus size={20}/>
                    </button>
                </div>
                {
                    openFileUpload && (
                        <div className='bg-white shadow rounded absolute bottom-20 w-36 p-2'>
                            <form>
                                <label htmlFor='uploadImage' className='flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer'>
                                    <div className='text-primary'>
                                        <FaImage size={18}/>
                                    </div>
                                    <p>Image</p>
                                </label>
                                <label htmlFor='uploadVideo' className='flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer'>
                                    <div className='text-primary'>
                                        <FaVideo size={18}/>
                                    </div>
                                    <p>Video</p>
                                </label>                                
                                <input
                                    type='file'
                                    id='uploadImage'
                                    className='hidden'
                                    onChange={(e)=>handleUploadFile('imageUrl',e)}
                                />
                                <input
                                    type='file'
                                    id='uploadVideo'
                                    className='hidden'
                                    onChange={(e)=>handleUploadFile('videoUrl',e)}
                                />

                            </form>
                        </div>
                    )
                }
                <form className='h-full w-full flex gap-2' onSubmit={handleSendMessage}>
                    <input 
                        type='text' 
                        placeholder="메세지를 입력하세요..." 
                        className='py-1 px-4 outline-none w-full h-full'
                        value={message.text}
                        onChange={(e)=>handleMessageChange('text',e.target.value)}
                    />
                    <button className='text-primary hover:text-secondary'>
                        <IoMdSend size={28}/>
                    </button>
                </form>
            </section>
        </div>
    )
}

export default MessagePage