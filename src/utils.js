import axios from 'axios'



const getAllData = (url) => axios.get(url);

//generic function which updates given dataCollection & object of the same collection.
//and updates or deletes it accordingly 
const updateCollection = (collection, obj, method) => {
    let newCollection = []
    switch(method)
    {
        case "PUT":
            newCollection = collection.map((item) => {
                if (item.id === obj.id){
                    return obj
                }
                return item
            })
            console.log("user updated")
            break;

        case "DELETE":
            const index = collection.findIndex((item) =>{
                return item.id == obj.id
            })
            if(index != -1){
                collection.splice(index,1)
                console.log("user deleted")
            }
            newCollection = collection
            break;
        case "POST":
            collection.push(obj)
            newCollection = collection
            break;
    }
    
    console.log(newCollection)
    return newCollection;
}

const checkIfUserTodosCompleted = (userTodos) => {
    const unfinishedTodos = userTodos.filter((todo) =>{
        return !todo.completed
    })
    if (unfinishedTodos.length === 0){
        return userTodos[0].userId;
    }
    return -1
}
//extract user's todos from the todos collection, return array with todos.
const getUserTodos = (todosCollection, userId) => {
    const userTodos = todosCollection.filter((todo) =>{
        return todo.userId === userId
    })
    return userTodos
}

//extract user's posts from the posts collection, return array with posts.
const getUserPosts = (postsCollection, userId) => {
    const userPosts = postsCollection.filter((post) =>{
        return post.userId === userId
    })
    console.log(userPosts)
    return userPosts
}


//return random number from 1-10000
const getRandomNum = (collection) =>{
    let notUnique = true
    let random;
    while(notUnique){
        random = Math.floor(Math.random() * 10000) + 1;
        const idsEqualToRandom = collection.filter((item) => {
            return item.id === random;
        })
        if (idsEqualToRandom.length === 0){
            notUnique = false;
        }
    }
    return random;
}


export {getRandomNum, getAllData, updateCollection, getUserTodos, getUserPosts, checkIfUserTodosCompleted}
