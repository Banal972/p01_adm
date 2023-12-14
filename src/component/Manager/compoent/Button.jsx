import React from 'react'
import {useNavigate} from "react-router-dom"

function Button({color,onClick,style,children}) {
    
  return (
    <button onClick={onClick} style={style} className={`${typeof(color) == "string" ? String(color) : ""} btn01`}>
        {children}
    </button>
  )

}


export default Button