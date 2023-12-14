import React from 'react'

function InputBox({title,name,width,value}){

    return (
        <div className="input-box">
            <label 
                htmlFor={name}
            >
                {title}
            </label>
            <input 
                type="text" 
                name={name} 
                id={name} 
                style={{maxWidth: width}}
                value={value}
                onChange={(e)=>{}} 
            />
        </div>
    )

}

export default InputBox