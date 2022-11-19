import { useEffect, useState } from 'react';
import './App.css';
import UserTodosComp from './Components/UserTodosComp';
import UserComp from './Components/UserComp';
import { getRandomNum, getAllData, updateCollection, getUserPosts, getUserTodos, checkIfUserTodosCompleted} from './utils.js';
import AddTodo from './Components/AddTodo';
import AddUser from './Components/AddUser';
import UserPostsComp from './Components/UserPostsComp';
import AddPost from './Components/AddPost';


const usersUrl = "https://jsonplaceholder.typicode.com/users"
const todosUrl = "https://jsonplaceholder.typicode.com/todos"
const postsUrl = "https://jsonplaceholder.typicode.com/posts"

function App() {
  const [users, setUsers] = useState([])
  const [todos, setTodos] = useState([])
  const [posts, setPosts] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  //sepecific user todos&posts --> sets onclick of id label in UserComp.js
  const [userTodos, setUserTodos] = useState([])
  const [usersWithCompleteTodos, setUsersWithCompleteTodos] = useState([])
  const [userIdThatClickedAddTodo, setUserIdThatClickedAddTodo] = useState(0)
  const [userPosts, setUserPosts] = useState([])
  const [userIdThatClickedAddPost, setUserIdThatClickedAddPost] = useState(0)
  const [addUserBtnClicked, setAddUserBtnClicked] = useState (false)  

  useEffect(() => {
    const initialData = async () => {
      const {data : usersData} =  await getAllData(usersUrl);
      const {data : todosData} =  await getAllData(todosUrl);
      const {data : postsData} =  await getAllData(postsUrl);
      const trimmedUsersData = usersData.map(user => ({id : user.id, name : user.name, email : user.email, address : user.address}))
      setUsers(trimmedUsersData);
      setTodos(todosData);
      setPosts(postsData);
    }
    initialData()
  },[])

  const ifTodosCompleted = (userId) => {
    return usersWithCompleteTodos.includes(userId)
  } 

  const handleSearch = (e) => {
    if (e.target.value === ""){
      setFilteredUsers([])
      return
    }

    let search = /^[a-zA-Z]+\s?([a-zA-Z]+)?$/.test(e.target.value) ? e.target.value.toLowerCase() : "unvalid"

    if (search)
    {
      const usersAfterFilter = [...users].filter((user) =>{
        return user.name.toLowerCase().includes(search) || user.email.toLowerCase().includes(search)
      })
      if (usersAfterFilter.length > 0){
        setFilteredUsers(usersAfterFilter)
      }
      else{
        setFilteredUsers(0)
      }
    }
  } 

  const updateUser = (newUser) => {
    const collection = updateCollection([...users], newUser, "PUT")
    setUsers(collection)
  }

  const deleteUser = (user) => {
    const collection = updateCollection([...users], user, "DELETE")
    setUsers(collection)
  }

  const updateTodo = (newTodoObj) => {
    console.log(newTodoObj)
    const collection = updateCollection([...todos], newTodoObj, "PUT")
    setTodos(collection)
    setUserTodos(getUserTodos(collection, newTodoObj.userId))

    const userWithCompletedTodos = checkIfUserTodosCompleted(getUserTodos(collection, newTodoObj.userId))
    if (userWithCompletedTodos !== -1){
      const arr = [...usersWithCompleteTodos]
      arr.push(userWithCompletedTodos)
      setUsersWithCompleteTodos(arr)
    }
  }

  const addUserBtnIsClicked = () =>{
    setAddUserBtnClicked(!addUserBtnClicked)
    //closing Add Todo Tab if opened
    setUserIdThatClickedAddTodo(0)
    setUserIdThatClickedAddPost(0)
  }

  const addTodoBtnIsClicked = (userId) => {
    setUserIdThatClickedAddTodo(userId)
  }

  const addPostBtnIsClicked = (userId) => {
    setUserIdThatClickedAddPost(userId)
  }

  const cancelOrAddUserBtnIsClicked = (userObj) => {
    if (userObj) {
      const id = getRandomNum(users);
      userObj["id"] = id
      const collection = updateCollection(users, userObj, "POST")
      setUsers(collection)
    }
    setAddUserBtnClicked(false)
  }

  const cancelOrAddTodoBtnIsClicked = (todoObj) => {
    if (todoObj) {
      const id = getRandomNum(todos);
      todoObj["id"] = id
      const collection = updateCollection(todos, todoObj, "POST")
      setTodos(collection)
      setUserTodos(getUserTodos(collection, todoObj.userId))
      if(ifTodosCompleted(todoObj.userId)){
        const index = usersWithCompleteTodos.indexOf(todoObj.userId)
        const arr = [...usersWithCompleteTodos]
        arr.splice(index, 1)
        setUsersWithCompleteTodos(arr)
      }
    }
    setUserIdThatClickedAddTodo(0)
  }

  const cancelOrAddPostBtnIsClicked = (postObj) => {
    if (postObj) {
      const id = getRandomNum(posts);
      postObj["id"] = id
      const collection = updateCollection(posts, postObj, "POST")
      setPosts(collection)
      setUserPosts(getUserPosts(collection, postObj.userId))
    }
    setUserIdThatClickedAddPost(0)
  }

  //what to do - how to put the data in app
  //the callback that is send to UserComp.js to detect when ID label is clicked
  const showUserTodos = (userId) => {
    if (userIdThatClickedAddTodo){
      setUserIdThatClickedAddTodo(0)
    }
    if (userIdThatClickedAddPost){
      setUserIdThatClickedAddPost(0)
    }
    if (addUserBtnClicked){
      setAddUserBtnClicked(false)
    }

    const allUserTodos = getUserTodos(todos, userId)
    setUserTodos(allUserTodos)
    allUserTodos.length > 0 ? setUserTodos(allUserTodos) : setUserTodos([userId])

    const allUserPosts = getUserPosts(posts, userId)
    allUserPosts.length > 0 ? setUserPosts(allUserPosts) : setUserPosts([userId])
  }

  return (
    <div style={{width: "700px", border: "yellow 1px solid", padding: "2px", overflow: "auto"}}>
      <div className='master' style={{width : "50%", float:"left"}}>
        <label htmlFor='searchBar'>
          <strong>Search</strong>
        </label>
        <input type='text' id='searchBar' name='search' onChange={handleSearch}/>
        <input type="button" value="Add User" onClick={addUserBtnIsClicked}/>   
        {
          filteredUsers.length == 0 && users.map(user => {
            return <UserComp key={user.id} userObj={user} callbacks={[updateUser, deleteUser, showUserTodos]} finishedTodos={ifTodosCompleted(user.id)} />
          })
        }
        {
          filteredUsers.length > 0 && filteredUsers.map(user => {
            return <UserComp key={user.id} userObj={user} callbacks={[updateUser, deleteUser, showUserTodos]} finishedTodos={ifTodosCompleted(user.id)} />
          })
        }

      </div>
      <div className='details' style={{width : "50%", float : "right"}}>
        {
          addUserBtnClicked && <AddUser callback={cancelOrAddUserBtnIsClicked}/>
        }
        {
          !addUserBtnClicked && !userIdThatClickedAddTodo && (userTodos.length > 0 || Number.isInteger(userTodos[0])) && <UserTodosComp todos={[...userTodos]} callback={[updateTodo, addTodoBtnIsClicked]}/>
        }
        {
          !addUserBtnClicked && userIdThatClickedAddTodo ? <AddTodo userId={userIdThatClickedAddTodo} callback={cancelOrAddTodoBtnIsClicked}/> : ""
        }
        <br/>
        {
          !addUserBtnClicked && !userIdThatClickedAddPost && (userPosts.length > 0 || Number.isInteger(userPosts[0])) && <UserPostsComp posts={[...userPosts]} callback={addPostBtnIsClicked}/>
        }
        {
          !addUserBtnClicked && userIdThatClickedAddPost ? <AddPost userId={userIdThatClickedAddPost} callback={cancelOrAddPostBtnIsClicked} /> : ""
        }
      </div>
    </div>

  );
}

export default App;
