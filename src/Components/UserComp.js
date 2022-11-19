import { useState, useEffect } from "react"
import OtherUserDataComp from "./OtherUserDataComp"


export default function UserComp({userObj, callbacks : [sendUpdatedUserToParent, sendDeletedUserToParent, sendUserID], finishedTodos})
{

    const [userData, setUserData] = useState(userObj)
    const [isHovered, setIsHovered] = useState(false)
    const [idClicked, setIdClicked] = useState(false)

    const getAddressDataFromChild = (newAddressObj) => {
        setUserData({...userData, address : newAddressObj})
    }

    useEffect(() =>{
        if (idClicked){
            sendUserID(userData.id)
            setIdClicked(false)
        }
    },[idClicked])

    return(
        <>
        <br/>
        <div style={{width: "300px", border: finishedTodos ? "green 2px solid" : "red 2px solid", backgroundColor: idClicked ? "salmon" : "white"}}>
            <label onClick={() => setIdClicked(!idClicked)}>
                ID: {userData.id}
            </label>
            <br/><br/>
            <label htmlFor={`Name${userData.id}`}>Name:</label>
            <input type="text" id={`Name${userData.id}`} name="userName" value={userData.name} onChange={(e) => setUserData({...userData, name: e.target.value})}/>
            <br/><br/>
            <label htmlFor={`userEmail${userData.id}`}>Email:</label>
            <input type="text" id={`userEmail${userData.id}`} name="userEmail" value={userData.email} onChange={(e) => setUserData({...userData, email: e.target.value})}/>
            <br/><br/>
            {
                isHovered && <OtherUserDataComp address={userData.address} id={userData.id} callback={getAddressDataFromChild}/>
            }
            <button type="button" onMouseOver={() => setIsHovered(true)} onClick={() => setIsHovered(false)}>Other Data</button>
            <button type="button" onClick={() => sendUpdatedUserToParent(userData)}>Update</button>
            <button type="button" onClick={() => sendDeletedUserToParent(userData)}>Delete</button>
        </div>
        </>


    )
}