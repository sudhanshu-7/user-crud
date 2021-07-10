import React from 'react'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import './NewUser.css'
function NewUser(props) {
    const his = useHistory()
    const [email,setEmail] = useState(props.email || "")
    const [username,setUsername] = useState(props.username || "")
    const [number,setNumber] = useState(props.number || "")
    const [country,setCountry] = useState(props.country || "")
    const [state,setState] = useState(props.state || "")
    const [city,setCity] = useState(props.city || "")
    const [area,setArea] = useState(props.area || "")
    const handleChangeEmail = (e)=>{
        setEmail(e.target.value)
    }
    const handleChangeNumber = (e)=>{
        setNumber(e.target.value)
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
    const [error,setError] = useState("")
    const formSubmit = async (e)=>{
        e.preventDefault()
        const userData = {
            username,
            email,
            country,
            state,
            city,
            area,
            "phone":parseInt(number)
        }
        try{
            const response = await fetch("http://localhost:5000/api",
        {
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(userData)
        }
        )
        const rD = await response.json()
        if(rD.error) throw rD.error
        console.log(rD);
        his.push("/")
        }catch(err){
            console.log(err)
            return setError("Got an Error from Backend! Please Check the inputs!")
        }
    }
    
    return (
        <div className="new-user">
            {error && <div className="error">{error} <Button onClick={()=>setError("")}>Close</Button></div>}

            <form className="flex-form" onSubmit={formSubmit}> 
                <label>
                    Enter Email: 
                    <input type="email" name="email" value={email} onChange={handleChangeEmail} required/>
                </label>
                <label>
                    Enter UserName: 
                    <input type="text" name="username" value={username} onChange={handleChangeUsername} required/>
                </label>
                <label>
                    Enter Phone: 
                    <input type="number" min={1000000000} max={9999999999} value={number} onChange={handleChangeNumber}  name="phone" required/>
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
                <Button type="submit">Submit </Button>
            </form>
        </div>
    )
}

export default NewUser
