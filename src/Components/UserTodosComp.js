
import { useEffect } from "react";
import SingleTodoComp from "./SingleTodoComp";



export default function UserTodosComp({todos, callback : [updateTodo, sendUserIdIfAddBtnClicked]})
{

    const checkIfNewUser = () => {
        if (Number.isInteger(todos[0])){
            return todos[0]
        }
        return todos[0].userId
    }

    return (
        <div style={{width :"300px", border : "orange 1px solid"}}>
            <label><strong>User {checkIfNewUser()}'s Todos</strong></label>
            <input type="button" value="Add Todo" onClick={() => sendUserIdIfAddBtnClicked(checkIfNewUser())}/>
            <div>
                {
                    !Number.isInteger(todos[0]) && todos.map(todo =>{
                        return <SingleTodoComp key={todo.id} todo={todo} callback={updateTodo} />
                    })
                }
            </div>
        </div>

    );
}