import React,{useState} from 'react'
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

function InputTextarea(){

    const [editorState,setEditorState] = useState(EditorState.createEmpty());

    const uploadImage = (file)=>{

        return new Promise(
            (resolve,reject) => {
                
                const imgURL = URL.createObjectURL(file)

                resolve({data : { link : imgURL }});
                
            }
        )

    }

    const onEditorStateChange = (editorState) =>{
      setEditorState(editorState);
    }

    return (
        
        <div className="input-textarea">
            <p>내용</p>
            <Editor
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                localization={{
                    locale : "ko"
                }}
                toolbar={{
                    image: {
                        urlEnabled: true,
                        uploadEnabled: true,
                        uploadCallback: uploadImage
                    }
                }}
                toolbarClassName="editor-toolbar"
                wrapperClassName="editor-wrapper"
                editorClassName="editor-class"
            />
        </div>

    )

}

export default InputTextarea