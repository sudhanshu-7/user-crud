import React from 'react'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import './UserCard.css'

function UserCard(props) {
    const [updateView,setUpdateView] = useState(false)
    const [email,setEmail] = useState(props.data.email || "")
    const [username,setUsername] = useState(props.data.username || "")
    const [phone,setphone] = useState(parseInt(props.data.phone))
    const [country,setCountry] = useState(props.data.country || "")
    const [state,setState] = useState(props.data.state || "")
    const [city,setCity] = useState(props.data.city || "")
    const [area,setArea] = useState(props.data.area || "")
    const handleChangeEmail = (e)=>{
        setEmail(e.target.value)
    }
    const handleChangephone = (e)=>{
        setphone(e.target.value)
    }
    const handleChangeCountry = (e)=>{
        setCountry(e.target.value)
    }
    const handleChangeState = (e)=>{
        setState(e.target.value)
    }
    const handleChangeCity = (e)=>{
        setCity(e.target.value)
    }
    const handleChangeArea = (e)=>{
        setArea(e.target.value)
    }
    const handleChangeUsername = (e)=>{
        setUsername(e.target.value)
    }
    const formSubmit = (e)=>{
        e.preventDefault()
    }
    const [error,setError] = useState("")
    const edit= async ()=>{
        const userData = {
            username,
            email:props.data.email,
            country,
            state,
            city,
            area,
            phone:parseInt(phone),
            id:props.data.id
        }
        try{
            const response = await fetch("http://localhost:5000/api",
        {
            method:"PATCH",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(userData)
        }
        )
        const rD = await response.json()
        console.log(rD);
        setUpdateView(prev =>!prev)
        }catch(err){
            return setError("Got an Error from Backend")
        }
        
    }
    const [deleted , setDeleted] = useState(false)
    const deleteHandler = async ()=>{
        const userData = {
            id:props.data.id
        }
        try{
             await fetch("http://localhost:5000/api",
            {
                method:"DELETE",
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(userData)
            })
            setDeleted(true)
        }catch(err){
            setError("Unable to Delete" + err)
        }
    }
    if(deleted) return (<></>)
    return (
        <>
        {error && <div className="error">{error} <Button onClick={()=>setError("")}>Close</Button></div>}

        {!updateView && <div className="item">
            <h1><strong>{username}</strong></h1>
            <p><em>&#128231; &nbsp;{email}</em></p>
            <p>&#128222;&nbsp; {phone}</p>
            <h6> &#127968; &nbsp;{`${area}, ${city}, ${state}, ${country}`}</h6>
            <Button variant="warning" onClick={()=>setUpdateView(prev=>!prev)}>Edit</Button>&nbsp;
            <Button variant="danger" onClick={deleteHandler}>Delete</Button>
        </div>}
        {updateView && <div className="item">
        <form className="flex-form" onSubmit={formSubmit}> 
                <label>
                    Enter Email: 
                    <input type="email" name="email" value={email} disabled onChange={handleChangeEmail} required/>
                </label>
                <label>
                    Enter UserName: 
                    <input type="text" name="username" value={username} onChange={handleChangeUsername} required/>
                </label>
                <label>
                    Enter Phone: 
                    <input type="number" min={1000000000} max={9999999999} value={phone} onChange={handleChangephone}  name="phone" required/>
                </label>
                <label>
                    Enter country: 
                    <input type="text" name="country" value={country} onChange={handleChangeCountry} required/>
                </label>
                <label>
                    Enter state: 
                    <input type="text" name="state" value={state} onChange={handleChangeState} required/>
                </label>
                <label>
                    Enter city: 
                    <input type="text" name="city" value={city} onChange={handleChangeCity} required/>
                </label>
                <label>
                    Enter area: 
                    <input type="text" name="area" value={area} onChange={handleChangeArea} required/>
                </label>
            <Button variant="success" onClick={edit}>Edit</Button>
            <Button variant="danger" onClick={()=>setUpdateView(prev=>!prev)}>Back</Button>
            </form>
            </div>
        }
        </>
    )
}


export default UserCard

