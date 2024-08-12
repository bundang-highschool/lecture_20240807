import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import UserSearchCard from './UserSearchCard'
import toast from 'react-hot-toast'
import axios from 'axios'
import { IoClose } from 'react-icons/io5'

const SearchUser = ({onClose})=>{
    const [search,setSearch] = useState("") //검색어 기억
    const [searchUser,setSearchUser] = useState([]) //검색결과
    
    const handleSearchUser = async() => {
        const URL = `${process.env.REACT_APP_BACKEND_URL}/api/search-user`
        try{
            const response = await axios.post(URL,{
                search: search
            })
            setSearchUser(response.data.data)
        }catch(error){
            toast.error(error?.response?.data?.message)
        }
    }
    useEffect(()=>{
        handleSearchUser()
    },[search])

    return (
        <div>
            <div>
                {/* 검색어 입력 */}
                <div>
                    <input
                        type='text'
                        placeholder='검색할 성명 및 이메일을 입력하세요'
                        className='w-full outline-none py-1 h-full px-4'
                        onChange={(e)=>setSearch(e.target.value)}
                        value={search}
                    />
                    <div>
                        <IoSearchOutline size={25}/>
                    </div>
                </div>

                {/* 검색 결과 표시 */}
                <div>
                </div>

                {/* 닫기버튼 */}
            </div>
        </div>
    )
}

export default SearchUser