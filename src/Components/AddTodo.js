import { useState } from "react";


export default function AddTodo({userId, callback : closeAddTodoTab})
{
    const [newTodo, setNewTodo] = useState("")

    const handleAddBtnClicked = () =>{
        const obj = {userId, completed: false, title : newTodo}
        closeAddTodoTab(obj)
    }
    return (
        <div>
            <label><strong>Create New Todo for User {userId}</strong></label>
             <div style={{width: "300px", border: "red 1px solid"}}>
                <label htmlFor="newTodo">Title: </label>
                <input type="text" placeholder="Learn Java..." id="newTodo" name="newTodo" onChange={(e) => setNewTodo(e.target.value)}/>
                <br/><br/>
                <input type="button" value="Create Todo" onClick={handleAddBtnClicked}/>
                <input type="button" value="Cancel" onClick={() => closeAddTodoTab()}/>


            </div>
        </div>

       
    );
}