import { useState } from "react";


export default function AddTodo({userId, callback : closeAddTodoTab})
{
    const [newTodo, setNewTodo] = useState("")

    const handleAddBtnClicked = () =>{
        const obj = {userId, completed: false, title : newTodo}
        closeAddTodoTab(obj)
    }
    return (
        <div className="card">
            <div className="card-header"><strong>New Todo for User {userId}</strong></div>
                <div className="card-body">
                <label htmlFor="newTodo">Title: </label>
                <input type="text" placeholder="Learn Java..." id="newTodo" name="newTodo" onChange={(e) => setNewTodo(e.target.value)}/>
                </div>
                <div className="card-footer">
                <input className="btn" type="button" value="Create Todo" onClick={handleAddBtnClicked}/>
                <input className="btn" type="button" value="Cancel" onClick={() => closeAddTodoTab()}/>
                </div>
        </div>

       
    );
}