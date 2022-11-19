import { useState } from "react";


export default function AddUser({callback : closeAddUserTab})
{
    const [name, setName] =  useState("")
    const [email, setEmail] =  useState("")

    const handleAddBtnClicked = () =>{
        const obj = {name, email, address : {city : "", street : "", zipcode: ""}}
        closeAddUserTab(obj)
    }
    return (
        <div style={{width: "300px", border: "pink 1px solid"}}>
            <label><strong>Add New User</strong></label>
            <div style={{width: "300px", border: "lightpink 1px solid"}}>
                <br/><br/>
                <label htmlFor="newName">Name:</label>
                <input type="text" name="newName" id="newName" onChange={(e) => setName(e.target.value)}/>
                <br/><br/>
                <label htmlFor="newEmail">Email:</label>
                <input type="email" name="newEmail" id="newEmail" onChange={(e) => setEmail(e.target.value)}/>
                <br/><br/>
                <input type="button" value="Create User" onClick={handleAddBtnClicked}/>
                <input type="button" value="Cancel" onClick={() => closeAddUserTab()}/>
            </div>
        </div>
    );
}
