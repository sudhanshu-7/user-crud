import React from 'react'
import {Link} from "react-router-dom"
import "./Header.css"
function Header() {
    return (
        <div className="flex header">
          <h1 className="heading">USER CRUD</h1>  
          
              <ul>
                  <Link to="/">User List</Link>
                  <Link to="/new">New User</Link>
              </ul>
        </div>
    )
}

export default Header
