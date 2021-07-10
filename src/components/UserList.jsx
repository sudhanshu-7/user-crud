import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import UserCard from './UserCard'
import './UserList.css'
function UserList() {
    const [error,setError] = useState("")
    const [users,setUsers]= useState([])
    const [loading,setLoading] = useState(true)
    let local = []
    useEffect(()=>{
        async function getResources(){
            try{
                const response = await fetch("http://localhost:5000/api")
                local = await response.json()
            }catch(err){
                return setError("Unable To Fetch Resources")
            }
            if(local.data.length === 0) return setError("No Users In the DataBase")
            setUsers(local.data)
        
        }
        
        getResources()
        setLoading(false)
        
    },[])
    return (
        <>
        {error && <div className="flex-userlist">{error}<br /> <Button onClick={()=>setError("")}>Close</Button></div>}
        <div className="flex-userlist">
            {loading && <h1>Loading Data</h1>}
            {!loading && users.map(user=><UserCard data={user}/>)}
        </div>
        </>
    )
}

export default UserList
