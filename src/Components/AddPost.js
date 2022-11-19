import { useState } from "react";


export default function AddPost({userId, callback : closeAddPostTab})
{
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const handlePostBtnClicked = () =>{
        const obj = {title, body, userId}
        closeAddPostTab(obj)
    }
    return (
        <div>
            <label><strong>Create New Post for User {userId}</strong></label>
             <div style={{width: "300px", border: "red 1px solid"}}>
                <br/>
                <label htmlFor="newTitle">Title: </label>
                <input type="text" placeholder="My Day" id="newTitle" name="newTitle" onChange={(e) => setTitle(e.target.value)}/>
                <br/><br/>
                <label htmlFor="newBody">Body: </label>
                <input type="text" placeholder="Story of my day..." id="newBody" name="newBody" onChange={(e) => setBody(e.target.value)}/>
                <br/><br/>
                <input type="button" value="Post" onClick={handlePostBtnClicked}/>
                <input type="button" value="Cancel" onClick={() => closeAddPostTab()}/>


            </div>
        </div>

       
    );
}