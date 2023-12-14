import React,{useState} from 'react'
import {BsDownload} from "react-icons/bs"

function InputFile(){

    const [file,setFile] = useState("");
    const [imagePreview,setImagePreview] = useState("");  

    return(

        <>
            <div className="input-file">
                <p>이미지</p>
                <label htmlFor="f">파일첨부 <BsDownload/></label>
                <input type="file" name="f" id="f" onChange={(e)=>{
                    e.preventDefault();

                    let reader = new FileReader(); // 파일 읽기
                    let file = e.target.files[0];
                    reader.onload = ()=>{
                        setFile(file);
                        setImagePreview(reader.result);
                    }
                    reader.readAsDataURL(file);

                }} />
            </div>
            { imagePreview && <img src={imagePreview} alt="" /> }
        </>

    )

}

export default InputFile