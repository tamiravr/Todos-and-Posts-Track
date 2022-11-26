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
        <div className="card">
            <div className="card-header">
                <strong>New Post for User {userId}</strong>
            </div>
            <div className="card-body">
                <label htmlFor="newTitle">Title: </label>
                <input type="text" placeholder="My Day" id="newTitle" name="newTitle" onChange={(e) => setTitle(e.target.value)}/>
                <br/><br/>
                <label htmlFor="newBody">Body: </label>
                <input type="text" placeholder="Story of my day..." id="newBody" name="newBody" onChange={(e) => setBody(e.target.value)}/>
                <div className="card-footer">
                    <input className="btn" type="button" value="Post" onClick={handlePostBtnClicked}/>
                    <input className="btn" type="button" value="Cancel" onClick={() => closeAddPostTab()}/>
                </div>
            </div>
        </div>

       
    );
}