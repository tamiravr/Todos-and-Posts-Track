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
        <div className="card card-limited">
            <div className="card-header scorlive-header">
                <strong>User {checkIfNewUser()}'s Todos</strong>
                <br/>
                <input className='btn btn-search' type="button" value="Add Todo" onClick={() => sendUserIdIfAddBtnClicked(checkIfNewUser())}/>
            </div>
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