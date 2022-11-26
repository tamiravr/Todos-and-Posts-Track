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
        <div className="card card-single-todo">
            <label><strong>Title: </strong>{todo.title}</label>
            <br/><br/>
            <label>
                <strong>Completed: </strong>{completed ? "True" : "False"}
            </label>
            {
                !completed && <div className="card-footer"><button className='btn btn-outline btn-search' type="button" onClick={()=>setIsClicked(true)}>Mark As Completed</button></div>
            }
        </div>
    );
}