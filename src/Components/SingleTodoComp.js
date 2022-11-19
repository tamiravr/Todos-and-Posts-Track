import { useState, useEffect } from "react";

export default function SingleTodoComp({todo, callback : sendEditedTodoToParent})
{
    const [isClicked, setIsClicked] = useState(false)
    const [completed,setCompleted] = useState(todo.completed)

    //console.log(`${todo.id} - single todoComp render`)
    useEffect(() => {
        if (isClicked){
            setCompleted(true)
            sendEditedTodoToParent({...todo, completed: true})
        }
    },[isClicked])

    return (
        <>
        <br/>
        <div style={{ width : "100%", border : "green 1px solid"}}>
            <label>Title: {todo.title}</label>
            <br/><br/>
            <label>
                Completed: {completed ? "True" : "False"}
            </label>
            <br/><br/>
            {
                !completed && <button type="button" onClick={()=>setIsClicked(true)}>Mark As Completed</button>
            }
        </div>
        </>
    );
}